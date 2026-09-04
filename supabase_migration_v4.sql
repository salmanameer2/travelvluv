-- supabase_migration_v4.sql

-- ==============================================================================
-- 1. PROFILES SECURITY & SCHEMAS
-- ==============================================================================

-- Ensure column exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text;

-- Replace any existing NULL values with 'user'
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;

-- Enforce DEFAULT and NOT NULL
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;

-- Enforce strict role domain
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));

-- Trigger to prevent normal users from updating profiles.role (Privilege Escalation Protection)
CREATE OR REPLACE FUNCTION public.protect_profile_role_update()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_caller_role text;
BEGIN
  -- Check actual DB role (ignores frontend payloads)
  SELECT role INTO v_caller_role FROM public.profiles WHERE id = auth.uid();
  
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF v_caller_role IS DISTINCT FROM 'admin' THEN
      RAISE EXCEPTION 'Not authorized to modify profile role.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_protect_profile_role ON public.profiles;
CREATE TRIGGER tr_protect_profile_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role_update();

-- Admin checking function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Ensure Admins can read user profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_admin());


-- ==============================================================================
-- 2. BOOKINGS SECURITY & SCHEMAS
-- ==============================================================================

-- Ensure status and audit columns exist
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS status text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Update existing NULL statuses to 'pending'
UPDATE public.bookings SET status = 'pending' WHERE status IS NULL;

-- Verify existing data for invalid statuses before constraint
DO $$
DECLARE
    invalid_count integer;
    invalid_statuses text;
BEGIN
    SELECT COUNT(*), string_agg(DISTINCT status, ', ')
    INTO invalid_count, invalid_statuses
    FROM public.bookings
    WHERE status NOT IN ('pending', 'confirmed', 'rejected', 'cancelled', 'completed');
    
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'Cannot apply status constraint. Found % bookings with invalid status values: %', invalid_count, invalid_statuses;
    END IF;
END $$;

-- Enforce DEFAULT and NOT NULL
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE public.bookings ALTER COLUMN status SET NOT NULL;

-- Enforce strict status domain
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled', 'completed'));


-- ==============================================================================
-- 3. EXPLICIT DEFENSE-IN-DEPTH PRIVILEGES FOR BOOKINGS
-- ==============================================================================

-- Strip direct mutation access at the table level
REVOKE UPDATE, DELETE ON TABLE public.bookings FROM anon;
REVOKE UPDATE, DELETE ON TABLE public.bookings FROM authenticated;

-- Grant only SELECT and INSERT
GRANT SELECT, INSERT ON TABLE public.bookings TO authenticated;


-- ==============================================================================
-- 4. SECURE RPCS FOR MUTATION
-- ==============================================================================

-- RPC for User to cancel their own booking safely
CREATE OR REPLACE FUNCTION public.cancel_booking(
  p_booking_id uuid
)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_booking record;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated.';
  END IF;

  -- The UPDATE is strictly atomic and enforces ownership and current status.
  UPDATE public.bookings
  SET
    status = 'cancelled',
    updated_at = now()
  WHERE id = p_booking_id
    AND user_id = auth.uid()
    AND status IN ('pending', 'confirmed')
  RETURNING * INTO v_booking;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found, not owned by user, or cannot be cancelled from its current status.';
  END IF;

  RETURN row_to_json(v_booking);
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_booking(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_booking(uuid) TO authenticated;

-- RPC for Admin to securely approve/reject bookings
CREATE OR REPLACE FUNCTION public.admin_update_booking_status(
  p_booking_id uuid,
  p_status text,
  p_rejection_reason text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_booking record;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admins only.';
  END IF;

  IF p_status NOT IN ('confirmed', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status. Must be confirmed or rejected.';
  END IF;

  IF p_status = 'rejected' AND (p_rejection_reason IS NULL OR trim(p_rejection_reason) = '') THEN
    RAISE EXCEPTION 'Rejection reason is required when rejecting a booking.';
  END IF;

  -- The UPDATE is strictly atomic. The AND status = 'pending' acts as a concurrency lock,
  -- ensuring two admins cannot race to approve the same booking.
  UPDATE public.bookings
  SET
    status = p_status,
    approved_by = auth.uid(),
    approved_at = now(),
    rejection_reason = CASE WHEN p_status = 'confirmed' THEN NULL ELSE trim(p_rejection_reason) END,
    updated_at = now()
  WHERE id = p_booking_id
    AND status = 'pending'
  RETURNING * INTO v_booking;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found or is no longer pending.';
  END IF;

  RETURN row_to_json(v_booking);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_booking_status(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_update_booking_status(uuid, text, text) TO authenticated;


-- ==============================================================================
-- 5. BOOKINGS RLS POLICIES
-- ==============================================================================

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Remove all previous policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete or cancel own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own pending bookings
CREATE POLICY "Users can insert their own bookings"
  ON public.bookings FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id 
    AND status = 'pending'
    AND approved_by IS NULL
    AND approved_at IS NULL
    AND rejection_reason IS NULL
  );

-- Policy: Admins can view all bookings
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- NO UPDATE POLICY FOR ANYONE ON BOOKINGS
-- NO DELETE POLICY FOR ANYONE ON BOOKINGS
