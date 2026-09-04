-- 1. Ensure profiles table has 'role' column defaulting to 'user'
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- 2. Ensure bookings table has status, approved_by, approved_at, rejection_reason
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled'));
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS rejection_reason text;

-- 3. Update bookings RLS
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

-- Policy: Users can update their own bookings (only to cancel)
CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id AND status IN ('pending', 'confirmed'))
  WITH CHECK (auth.uid() = user_id AND status = 'cancelled');

-- 4. Create Admin helper function (Safe from infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Policy: Admins can view all bookings
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin());

-- Policy: Admins can update all bookings
CREATE POLICY "Admins can update all bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_admin());

-- 5. Ensure Admins can read user profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());
