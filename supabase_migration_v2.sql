-- 1. Ensure profiles table has 'role' column defaulting to 'user'
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' NOT NULL;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));

-- 2. Trigger to prevent normal users from updating profiles.role (Privilege Escalation Protection)
CREATE OR REPLACE FUNCTION public.protect_profile_role_update()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE
  v_caller_role text;
BEGIN
  -- Check the actual database role for the authenticated user to avoid trusting frontend payload
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

-- 3. Ensure bookings table has status and audit fields
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' NOT NULL;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled'));

ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS rejection_reason text;

-- 4. Admin checking function (Safeguard)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 5. Trigger to prevent normal users from updating booking audit fields or confirming/rejecting
CREATE OR REPLACE FUNCTION public.protect_booking_update()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
AS $$
BEGIN
  -- If caller is not an admin, they are subject to strict mutation limits
  IF NOT public.is_admin() THEN
    
    -- Normal users cannot modify ownership or audit fields
    NEW.user_id = OLD.user_id;
    NEW.approved_by = OLD.approved_by;
    NEW.approved_at = OLD.approved_at;
    NEW.rejection_reason = OLD.rejection_reason;

    -- Normal users can only change status to 'cancelled'
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      IF NEW.status <> 'cancelled' THEN
        RAISE EXCEPTION 'Users can only transition status to cancelled.';
      END IF;
    END IF;
    
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_protect_booking_update ON public.bookings;
CREATE TRIGGER tr_protect_booking_update
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.protect_booking_update();

-- 6. RPC for Admin to securely approve/reject bookings (Avoids Admin UPDATE policy)
CREATE OR REPLACE FUNCTION public.admin_update_booking_status(
  p_booking_id text,
  p_status text,
  p_rejection_reason text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp
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

  UPDATE public.bookings
  SET
    status = p_status,
    approved_by = auth.uid(),
    approved_at = now(),
    rejection_reason = p_rejection_reason,
    updated_at = now()
  WHERE id::text = p_booking_id
  RETURNING * INTO v_booking;

  RETURN row_to_json(v_booking);
END;
$$;

-- 7. Update bookings RLS Policies
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own bookings
CREATE POLICY "Users can insert their own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Policy: Users can update their own bookings
-- (The BEFORE UPDATE trigger safely enforces that they can only cancel and cannot touch audit fields)
CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Admins can view all bookings
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin());

-- Notice: There is no Admins UPDATE policy for bookings. Admins must use the RPC function.

-- 8. Ensure Admins can read user profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());
