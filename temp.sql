-- ============================================================
-- LEO CLUB CHANDIGARH FORTUNE
-- INITIAL DATABASE SCHEMA
-- Supabase + Google OAuth
-- ============================================================
-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- ============================================================
-- 2. MASTER TABLES
-- ============================================================
-- ----------------------------
-- Gender Master
-- ----------------------------
CREATE TABLE IF NOT EXISTS public.gender_master (
    id SMALLSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);
-- ----------------------------
-- Blood Group Master
-- ----------------------------
CREATE TABLE IF NOT EXISTS public.blood_group_master (
    id SMALLSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);
-- ----------------------------
-- Disability / Person of Determination Master
-- ----------------------------
CREATE TABLE IF NOT EXISTS public.disability_master (
    id SMALLSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);
-- ----------------------------
-- Occupation Master
-- ----------------------------
CREATE TABLE IF NOT EXISTS public.occupation_master (
    id SMALLSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);
-- ----------------------------
-- Membership Type Master
-- ----------------------------
CREATE TABLE IF NOT EXISTS public.membership_type_master (
    id SMALLSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    price_inr INTEGER NOT NULL CHECK (price_inr >= 0),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    display_order SMALLINT DEFAULT 1
);
-- ============================================================
-- 3. MASTER DATA
-- ============================================================
INSERT INTO public.gender_master (code, name)
VALUES ('MALE', 'Male'),
    ('FEMALE', 'Female'),
    ('PREFER_NOT_TO_SAY', 'Prefer not to say') ON CONFLICT (code) DO NOTHING;
INSERT INTO public.blood_group_master (code, name)
VALUES ('A_POSITIVE', 'A+'),
    ('A_NEGATIVE', 'A-'),
    ('B_POSITIVE', 'B+'),
    ('B_NEGATIVE', 'B-'),
    ('AB_POSITIVE', 'AB+'),
    ('AB_NEGATIVE', 'AB-'),
    ('O_POSITIVE', 'O+'),
    ('O_NEGATIVE', 'O-') ON CONFLICT (code) DO NOTHING;
INSERT INTO public.disability_master (code, name)
VALUES ('YES', 'Yes'),
    ('NO', 'No') ON CONFLICT (code) DO NOTHING;
INSERT INTO public.occupation_master (code, name)
VALUES ('STUDENT', 'Student'),
    ('EMPLOYED', 'Employed'),
    ('SELF_EMPLOYED', 'Self Employed'),
    ('BUSINESS', 'Business'),
    ('PROFESSIONAL', 'Professional'),
    ('OTHER', 'Other') ON CONFLICT (code) DO NOTHING;
INSERT INTO public.membership_type_master (code, name, price_inr, display_order)
VALUES ('REGULAR', 'Regular', 719, 1),
    ('FELLOWSHIP', 'Fellowship', 1149, 2),
    ('ELITE', 'Elite', 2199, 3) ON CONFLICT (code) DO NOTHING;
-- ============================================================
-- 4. PUBLIC USERS
-- Linked directly with Supabase Auth
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ============================================================
-- 5. MEMBER PROFILE
-- Personal / application information
-- ============================================================
CREATE TABLE IF NOT EXISTS public.member_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    phone TEXT,
    dob DATE,
    gender_id SMALLINT REFERENCES public.gender_master(id),
    blood_group_id SMALLINT REFERENCES public.blood_group_master(id),
    disability_id SMALLINT REFERENCES public.disability_master(id),
    address TEXT,
    city TEXT,
    pin_code TEXT,
    occupation_id SMALLINT REFERENCES public.occupation_master(id),
    institute TEXT,
    has_reference BOOLEAN DEFAULT FALSE NOT NULL,
    reference_name TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    -- If user says NO reference,
    -- reference_name MUST be empty.
    CONSTRAINT reference_name_check CHECK (
        has_reference = TRUE
        OR reference_name IS NULL
        OR BTRIM(reference_name) = ''
    )
);
-- ============================================================
-- 6. APPLICATION STATUS
-- ============================================================
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'application_status'
) THEN CREATE TYPE public.application_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'INTERVIEW_PENDING',
    'INTERVIEW_COMPLETED',
    'ACCEPTED',
    'REJECTED',
    'PAYMENT_PENDING',
    'PAYMENT_VERIFIED',
    'ACTIVE'
);
END IF;
END $$;
-- ============================================================
-- 7. MEMBERSHIP APPLICATION
-- ============================================================
CREATE TABLE IF NOT EXISTS public.membership_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    membership_type_id SMALLINT NOT NULL REFERENCES public.membership_type_master(id),
    status public.application_status DEFAULT 'DRAFT' NOT NULL,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ============================================================
-- 8. DECLARATION MASTER
-- ============================================================
CREATE TABLE IF NOT EXISTS public.declaration_master (
    id SMALLSERIAL PRIMARY KEY,
    version TEXT UNIQUE NOT NULL,
    declaration_text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- Initial declaration
INSERT INTO public.declaration_master (version, declaration_text)
VALUES (
        '1.0',
        'I declare that the information provided by me is true and correct to the best of my knowledge and I agree to abide by the rules and regulations of Leo Club Chandigarh Fortune.'
    ) ON CONFLICT (version) DO NOTHING;
-- ============================================================
-- 9. APPLICATION DECLARATION
-- Records exactly what declaration the applicant accepted
-- ============================================================
CREATE TABLE IF NOT EXISTS public.application_declarations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID UNIQUE NOT NULL REFERENCES public.membership_applications(id) ON DELETE CASCADE,
    declaration_id SMALLINT NOT NULL REFERENCES public.declaration_master(id),
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    accepted_at TIMESTAMPTZ
);
-- ============================================================
-- 10. CONTACT US SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'NEW' NOT NULL CHECK (
        status IN (
            'NEW',
            'IN_PROGRESS',
            'RESOLVED',
            'CLOSED'
        )
    ),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ============================================================
-- 11. MEMBER DOCUMENT METADATA
--
-- DO NOT store actual files in PostgreSQL.
-- Actual files will go into Supabase Storage.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.member_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (
        document_type IN (
            'ID_PROOF',
            'OMEGA_PROOF'
        )
    ),
    storage_bucket TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    original_file_name TEXT,
    mime_type TEXT,
    file_size_bytes BIGINT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (user_id, document_type)
);
-- ============================================================
-- 12. ADMIN EMAILS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_emails (
    email TEXT PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
-- ============================================================
-- IMPORTANT:
-- REPLACE THESE WITH YOUR FOUR REAL ADMIN EMAIL ADDRESSES
-- ============================================================
INSERT INTO public.admin_emails (email)
VALUES ('leoclubpresident.chd@gmail.com'),
    ('leoclubsecretary.chd@gmail.com'),
    ('leoclubtreasurer.chd@gmail.com'),
    ('leoclubchandigarhfortune@gmail.com') ON CONFLICT (email) DO NOTHING;
-- ============================================================
-- 13. ADMIN CHECK FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER
SET search_path = public AS $$
SELECT EXISTS (
        SELECT 1
        FROM public.admin_emails
        WHERE LOWER(email) = LOWER(auth.jwt()->>'email')
            AND is_active = TRUE
    );
$$;
-- ============================================================
-- 14. AUTOMATIC USER CREATION AFTER OAUTH
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$ BEGIN
INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        avatar_url
    )
VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        NEW.raw_user_meta_data->>'avatar_url'
    ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.member_profiles (user_id)
VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- ============================================================
-- 15. ENABLE RLS
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gender_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_group_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disability_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occupation_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_type_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.declaration_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;
-- ============================================================
-- 16. MASTER DATA POLICIES
-- Anyone authenticated can READ master data.
-- They cannot modify it.
-- ============================================================
CREATE POLICY "Authenticated users can read gender master" ON public.gender_master FOR
SELECT TO authenticated USING (is_active = TRUE);
CREATE POLICY "Authenticated users can read blood group master" ON public.blood_group_master FOR
SELECT TO authenticated USING (is_active = TRUE);
CREATE POLICY "Authenticated users can read disability master" ON public.disability_master FOR
SELECT TO authenticated USING (is_active = TRUE);
CREATE POLICY "Authenticated users can read occupation master" ON public.occupation_master FOR
SELECT TO authenticated USING (is_active = TRUE);
CREATE POLICY "Authenticated users can read membership types" ON public.membership_type_master FOR
SELECT TO authenticated USING (is_active = TRUE);
CREATE POLICY "Authenticated users can read declarations" ON public.declaration_master FOR
SELECT TO authenticated USING (is_active = TRUE);
-- ============================================================
-- 17. USERS POLICIES
-- ============================================================
CREATE POLICY "Users can view their own account" ON public.users FOR
SELECT TO authenticated USING (
        id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Users can update their own account" ON public.users FOR
UPDATE TO authenticated USING (
        id = auth.uid()
        OR public.is_admin()
    ) WITH CHECK (
        id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Admins can view all users" ON public.users FOR
SELECT TO authenticated USING (public.is_admin());
-- ============================================================
-- 18. MEMBER PROFILE POLICIES
-- ============================================================
CREATE POLICY "Members can view their own profile" ON public.member_profiles FOR
SELECT TO authenticated USING (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can create their own profile" ON public.member_profiles FOR
INSERT TO authenticated WITH CHECK (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can update their own profile" ON public.member_profiles FOR
UPDATE TO authenticated USING (
        user_id = auth.uid()
        OR public.is_admin()
    ) WITH CHECK (
        user_id = auth.uid()
        OR public.is_admin()
    );
-- ============================================================
-- 19. APPLICATION POLICIES
-- ============================================================
CREATE POLICY "Members can view their own applications" ON public.membership_applications FOR
SELECT TO authenticated USING (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can create their own application" ON public.membership_applications FOR
INSERT TO authenticated WITH CHECK (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can update their own application" ON public.membership_applications FOR
UPDATE TO authenticated USING (
        user_id = auth.uid()
        OR public.is_admin()
    ) WITH CHECK (
        user_id = auth.uid()
        OR public.is_admin()
    );
-- ============================================================
-- 20. APPLICATION DECLARATION POLICIES
-- ============================================================
CREATE POLICY "Members can view their declaration" ON public.application_declarations FOR
SELECT TO authenticated USING (
        EXISTS (
            SELECT 1
            FROM public.membership_applications ma
            WHERE ma.id = application_id
                AND (
                    ma.user_id = auth.uid()
                    OR public.is_admin()
                )
        )
    );
CREATE POLICY "Members can create their declaration" ON public.application_declarations FOR
INSERT TO authenticated WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.membership_applications ma
            WHERE ma.id = application_id
                AND (
                    ma.user_id = auth.uid()
                    OR public.is_admin()
                )
        )
    );
-- ============================================================
-- 21. DOCUMENT POLICIES
-- ============================================================
CREATE POLICY "Members can view their own document metadata" ON public.member_documents FOR
SELECT TO authenticated USING (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can insert their own document metadata" ON public.member_documents FOR
INSERT TO authenticated WITH CHECK (
        user_id = auth.uid()
        OR public.is_admin()
    );
CREATE POLICY "Members can delete their own document metadata" ON public.member_documents FOR DELETE TO authenticated USING (
    user_id = auth.uid()
    OR public.is_admin()
);
-- ============================================================
-- 22. CONTACT US POLICIES
--
-- Guests can submit contact forms.
-- Only admins can read them.
-- ============================================================
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR
INSERT TO anon,
    authenticated WITH CHECK (TRUE);
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR
SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions FOR
UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
-- ============================================================
-- 23. INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_membership_applications_user ON public.membership_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON public.membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_member_documents_user ON public.member_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON public.contact_submissions(created_at DESC);
-- ============================================================
-- 24. STORAGE BUCKET
--
-- PRIVATE bucket for ID/Omega documents.
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES (
        'member-documents',
        'member-documents',
        FALSE
    ) ON CONFLICT (id) DO NOTHING;
-- ============================================================
-- 25. STORAGE SECURITY
-- Members can upload only to their own folder.
--
-- Expected path:
--
-- user-id/id-proof.pdf
-- user-id/omega-proof.pdf
-- ============================================================
CREATE POLICY "Members can upload own documents" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'member-documents'
        AND (
            (storage.foldername(name)) [1] = (
                SELECT auth.uid()::text
            )
            OR public.is_admin()
        )
    );
CREATE POLICY "Members can view own documents" ON storage.objects FOR
SELECT TO authenticated USING (
        bucket_id = 'member-documents'
        AND (
            (storage.foldername(name)) [1] = (
                SELECT auth.uid()::text
            )
            OR public.is_admin()
        )
    );
CREATE POLICY "Members can delete own documents" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'member-documents'
    AND (
        (storage.foldername(name)) [1] = (
            SELECT auth.uid()::text
        )
        OR public.is_admin()
    )
);
-- ============================================================
-- END
-- ============================================================