-- ============================================================================
-- ROAMSTORY TRAVEL PLATFORM — SUPABASE PRODUCTION DATABASE SCHEMA & SECURITY
-- ============================================================================
-- Description: Complete, idempotent SQL script for Supabase PostgreSQL database.
-- Includes:
--   1. Extensions
--   2. Public Profiles table (linked to auth.users)
--   3. Public Bookings table (with status constraints, pricing, and itinerary details)
--   4. Performance Indexes
--   5. Automatic User Profile Trigger (handles Email & Google OAuth signup metadata)
--   6. Automatic updated_at Timestamps Trigger
--   7. Row Level Security (RLS) & Granular Access Control Policies
--   8. Table Permissions & Grants
--
-- Instructions:
--   1. Open your Supabase Dashboard (https://supabase.com/dashboard)
--   2. Navigate to SQL Editor -> New Query
--   3. Paste this entire script and click "Run"
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. PROFILES TABLE
-- ============================================================================
-- Stores public user profile information tied directly to Supabase Auth.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    phone TEXT,
    nationality TEXT,
    home_airport TEXT,
    dietary_preferences TEXT,
    membership_tier TEXT DEFAULT 'Silver Explorer',
    reward_points INTEGER DEFAULT 500,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Comments for database documentation
COMMENT ON TABLE public.profiles IS 'User profile details linked to auth.users';
COMMENT ON COLUMN public.profiles.id IS 'References auth.users.id';

-- ============================================================================
-- 3. BOOKINGS TABLE
-- ============================================================================
-- Stores luxury travel itineraries, passenger details, and booking statuses.
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    confirmation_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    destination_country TEXT,
    destination_image TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    travel_date DATE NOT NULL,
    return_date DATE,
    adults INTEGER NOT NULL DEFAULT 1 CHECK (adults >= 1),
    children INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0),
    travelers_summary TEXT,
    travel_package TEXT DEFAULT 'Custom Bespoke',
    accommodation_type TEXT DEFAULT 'Luxury Villa',
    accommodation_id TEXT,
    transportation TEXT DEFAULT 'Private Chauffeur',
    travel_class TEXT DEFAULT 'Business Class VIP',
    travel_class_id TEXT,
    budget_range TEXT,
    preferred_activities JSONB DEFAULT '[]'::jsonb,
    special_requests TEXT,
    estimated_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (estimated_price >= 0),
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Comments
COMMENT ON TABLE public.bookings IS 'Customer travel reservations and itinerary specs';
COMMENT ON COLUMN public.bookings.user_id IS 'Owner ID referencing auth.users(id)';
COMMENT ON COLUMN public.bookings.confirmation_number IS 'Human-readable booking reference (e.g. RS-XXXXXX)';

-- ============================================================================
-- 4. PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_destination_id ON public.bookings(destination_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_confirmation_number ON public.bookings(confirmation_number);

-- ============================================================================
-- 5. TRIGGER FUNCTIONS: UPDATED_AT TIMESTAMP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach updated_at triggers
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.bookings;
CREATE TRIGGER set_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 6. AUTOMATIC USER PROFILE CREATION (AUTH TRIGGER)
-- ============================================================================
-- Automatically inserts a row into public.profiles whenever a new user
-- signs up via Supabase Auth (Email/Password or Google OAuth).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_full_name TEXT;
    v_avatar_url TEXT;
BEGIN
    -- Extract full name from raw_user_meta_data if available
    v_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    
    -- Extract avatar URL from Google OAuth or user metadata
    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture',
        ''
    );

    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        avatar_url,
        phone,
        nationality,
        home_airport,
        dietary_preferences,
        membership_tier,
        reward_points
    )
    VALUES (
        NEW.id,
        v_full_name,
        NEW.email,
        v_avatar_url,
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'nationality', 'Global Explorer'),
        COALESCE(NEW.raw_user_meta_data->>'home_airport', ''),
        COALESCE(NEW.raw_user_meta_data->>'dietary_preferences', 'None specified'),
        'Platinum Concierge VIP',
        1000
    )
    ON CONFLICT (id) DO UPDATE
    SET
        email = EXCLUDED.email,
        full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
        avatar_url = COALESCE(NULLIF(public.profiles.avatar_url, ''), EXCLUDED.avatar_url),
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to hook auth.users on insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- BOOKINGS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
CREATE POLICY "Users can view own bookings"
    ON public.bookings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
CREATE POLICY "Users can create own bookings"
    ON public.bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;
CREATE POLICY "Users can update own bookings"
    ON public.bookings
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete or cancel own bookings" ON public.bookings;
CREATE POLICY "Users can delete or cancel own bookings"
    ON public.bookings
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- ============================================================================
-- 8. PERMISSIONS & GRANTS
-- ============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT SELECT ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.bookings TO authenticated;

-- ============================================================================
-- END OF SCRIPT — Database Ready for Production
-- ============================================================================
