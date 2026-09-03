-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL,
    message text NOT NULL,
    user_id uuid REFERENCES auth.users(id),
    status text NOT NULL DEFAULT 'new',
    created_at timestamptz NOT NULL DEFAULT now(),
    
    -- Constraints
    CONSTRAINT valid_subject CHECK (
        subject IN (
            'General Inquiry',
            'Bespoke Trip Planning',
            'Private Group Charter',
            'Press and Media'
        )
    ),
    CONSTRAINT valid_status CHECK (
        status IN (
            'new',
            'email_sent',
            'email_failed',
            'read',
            'replied'
        )
    )
);

-- 2. Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Guests and Authenticated users can insert messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages"
    ON public.contact_messages
    FOR INSERT
    TO public
    WITH CHECK (true);

-- No public SELECT, UPDATE, or DELETE policies are created.
-- Only the Service Role (used by the Edge Function) can SELECT or UPDATE messages.
