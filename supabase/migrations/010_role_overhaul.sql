-- 010: Role system overhaul
-- Rename admin → faculty, add friend role, directory clicks, student profile fields

-- ══════════════════════════════════════════════════════════════
-- 1. Update role constraint: admin → faculty, add friend
-- ══════════════════════════════════════════════════════════════

ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_role_check;
UPDATE user_profiles SET role = 'faculty' WHERE role = 'admin';
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check
  CHECK (role IN ('student', 'alumni', 'employer', 'faculty', 'friend'));

-- ══════════════════════════════════════════════════════════════
-- 2. Update newsletter subscriber types
-- ══════════════════════════════════════════════════════════════

ALTER TABLE newsletter_subscribers DROP CONSTRAINT newsletter_subscribers_type_check;
ALTER TABLE newsletter_subscribers ADD CONSTRAINT newsletter_subscribers_type_check
  CHECK (type IN ('student', 'alumni', 'employer', 'faculty', 'friend'));

UPDATE newsletter_subscribers SET type = 'faculty' WHERE type = 'admin';

-- ══════════════════════════════════════════════════════════════
-- 3. Update signup trigger: admin → faculty
-- ══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
declare
  matched_pid bigint;
  is_faculty boolean;
begin
  select exists(
    select 1 from public.admin_emails where lower(email) = lower(new.email)
  ) into is_faculty;

  select e.person_id into matched_pid
  from public.emails e
  where lower(e.address) = lower(new.email)
  limit 1;

  insert into public.user_profiles (id, person_id, role, display_name)
  values (
    new.id,
    matched_pid,
    case when is_faculty then 'faculty' else 'alumni' end,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- ══════════════════════════════════════════════════════════════
-- 4. Update RLS policies: admin → faculty
-- ══════════════════════════════════════════════════════════════

-- user_profiles
DROP POLICY IF EXISTS "Admins read all" ON user_profiles;
CREATE POLICY "Faculty read all" ON user_profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

-- jobs
DROP POLICY IF EXISTS "Admins manage all jobs" ON jobs;
CREATE POLICY "Faculty manage all jobs" ON jobs FOR ALL USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

-- consortium_members
DROP POLICY IF EXISTS "Admins manage consortium" ON consortium_members;
CREATE POLICY "Faculty manage consortium" ON consortium_members FOR ALL USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

-- newsletter_subscribers
DROP POLICY IF EXISTS "Admins manage newsletter" ON newsletter_subscribers;
CREATE POLICY "Faculty manage newsletter" ON newsletter_subscribers FOR ALL USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

-- admin_emails
DROP POLICY IF EXISTS "Admins read admin_emails" ON admin_emails;
CREATE POLICY "Faculty read admin_emails" ON admin_emails FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

-- ══════════════════════════════════════════════════════════════
-- 5. Directory clicks tracking
-- ══════════════════════════════════════════════════════════════

CREATE TABLE directory_clicks (
  id bigint generated always as identity primary key,
  clicked_by uuid not null references auth.users(id),
  person_id bigint not null references people(id),
  click_type text not null check (click_type in ('profile_view', 'linkedin_click')),
  created_at timestamptz default now()
);

ALTER TABLE directory_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own clicks" ON directory_clicks FOR INSERT
  WITH CHECK (auth.uid() = clicked_by);

CREATE POLICY "Faculty read all clicks" ON directory_clicks FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'faculty')
);

CREATE INDEX directory_clicks_person_idx ON directory_clicks (person_id);
CREATE INDEX directory_clicks_type_idx ON directory_clicks (click_type, created_at);

-- ══════════════════════════════════════════════════════════════
-- 6. Student profile fields on people table
-- ══════════════════════════════════════════════════════════════

ALTER TABLE people ADD COLUMN IF NOT EXISTS track text;
ALTER TABLE people ADD COLUMN IF NOT EXISTS target_roles text;
ALTER TABLE people ADD COLUMN IF NOT EXISTS gpa numeric(3,2);
ALTER TABLE people ADD COLUMN IF NOT EXISTS resume_url text;
ALTER TABLE people ADD COLUMN IF NOT EXISTS internship_experience text;

-- ══════════════════════════════════════════════════════════════
-- 7. Simplify consortium to single tier
-- ══════════════════════════════════════════════════════════════

ALTER TABLE consortium_members DROP CONSTRAINT IF EXISTS consortium_members_tier_check;
ALTER TABLE consortium_members ADD CONSTRAINT consortium_members_tier_check
  CHECK (tier IN ('member'));

UPDATE consortium_members SET tier = 'member' WHERE tier != 'member';
