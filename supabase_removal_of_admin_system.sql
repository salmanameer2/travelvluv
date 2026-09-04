-- ==============================================================================
-- SUPABASE FINAL CUSTOMER-ONLY MIGRATION
-- COMPLETELY REMOVING ADMIN WORKFLOW & RESTORING LEAST-PRIVILEGE CUSTOMER ACCESS
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE CLEANUP
-- ------------------------------------------------------------------------------

-- Drop admin-specific profile policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Drop profile role protection trigger and function
DROP TRIGGER IF EXISTS tr_protect_profile_role ON public.profiles;
DROP FUNCTION IF EXISTS public.protect_profile_role_update();

-- Drop role check constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Drop role column completely
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Drop is_admin helper function
DROP FUNCTION IF EXISTS public.is_admin();


-- ------------------------------------------------------------------------------
-- 2. BOOKINGS TABLE CLEANUP
-- ------------------------------------------------------------------------------

-- Drop admin status update RPCs
DROP FUNCTION IF EXISTS public.admin_update_booking_status(uuid, text, text);
DROP FUNCTION IF EXISTS public.admin_update_booking_status(text, text, text);

-- Drop booking update protection trigger and function
DROP TRIGGER IF EXISTS tr_protect_booking_update ON public.bookings;
DROP FUNCTION IF EXISTS public.protect_booking_update();

-- Drop cancel_booking RPC (temporary admin-era RPC, frontend now uses direct column-scoped update)
DROP FUNCTION IF EXISTS public.cancel_booking(uuid);

-- Drop admin audit columns
ALTER TABLE public.bookings DROP COLUMN IF EXISTS approved_by;
ALTER TABLE public.bookings DROP COLUMN IF EXISTS approved_at;
ALTER TABLE public.bookings DROP COLUMN IF EXISTS rejection_reason;


-- ------------------------------------------------------------------------------
-- 3. RESTORE ORIGINAL CUSTOMER BOOKING STATUSES (confirmed, cancelled, completed)
-- ------------------------------------------------------------------------------

-- Set default status to 'confirmed' for all new customer bookings
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'confirmed';
ALTER TABLE public.bookings ALTER COLUMN status SET NOT NULL;

-- Enforce strict customer status domain
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_status_check
    CHECK (status IN ('confirmed', 'cancelled', 'completed'));


-- ------------------------------------------------------------------------------
-- 4. RESTORE CUSTOMER-ONLY ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Ensure Row Level Security is active
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop all admin, delete, and legacy restrictive policies
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can cancel own confirmed bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete or cancel own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can delete own bookings" ON public.bookings;

-- Policy: Customers can only view their own bookings
CREATE POLICY "Users can view own bookings"
    ON public.bookings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Customers can only insert their own bookings
CREATE POLICY "Users can create own bookings"
    ON public.bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy: Customers can only cancel their own eligible confirmed bookings
-- Prevents modifying bookings that are already cancelled or completed
CREATE POLICY "Users can cancel own confirmed bookings"
    ON public.bookings
    FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = user_id
        AND status = 'confirmed'
    )
    WITH CHECK (
        auth.uid() = user_id
        AND status = 'cancelled'
    );


-- ------------------------------------------------------------------------------
-- 5. LEAST-PRIVILEGE PERMISSIONS & GRANTS
-- ------------------------------------------------------------------------------

-- Grant schema access
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant customer read and insert on bookings (NO DELETE granted)
GRANT SELECT, INSERT ON TABLE public.bookings TO authenticated;
REVOKE DELETE ON TABLE public.bookings FROM authenticated, anon;

-- Restrict UPDATE to ONLY status and updated_at
-- This completely prevents customers from modifying arbitrary columns (price, dates, itinerary, etc.)
REVOKE UPDATE ON TABLE public.bookings FROM authenticated;
GRANT UPDATE (status, updated_at) ON TABLE public.bookings TO authenticated;

-- Revoke all access from unauthenticated anon users on private bookings
REVOKE ALL ON TABLE public.bookings FROM anon;
