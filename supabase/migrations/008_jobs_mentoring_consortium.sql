-- Jobs, Mentoring, Employer Consortium, Newsletter

-- ── Jobs ──
create table jobs (
  id bigint generated always as identity primary key,
  posted_by uuid not null references auth.users(id),
  company_name text not null,
  title text not null,
  description text,
  location text,
  job_type text check (job_type in ('full-time', 'internship', 'part-time', 'contract')),
  role_bucket text,
  url text,
  contact_email text,
  is_active boolean default true,
  is_consortium_priority boolean default false,
  created_at timestamptz default now(),
  expires_at timestamptz
);

alter table jobs enable row level security;
create policy "Public read active jobs" on jobs for select using (is_active = true);
create policy "Users insert own jobs" on jobs for insert with check (auth.uid() = posted_by);
create policy "Users update own jobs" on jobs for update using (auth.uid() = posted_by);
create policy "Admins manage all jobs" on jobs for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- ── Mentor Requests ──
create table mentor_requests (
  id bigint generated always as identity primary key,
  student_id uuid not null references auth.users(id),
  mentor_person_id bigint not null references people(id),
  message text,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now()
);

alter table mentor_requests enable row level security;
create policy "Students read own requests" on mentor_requests for select
  using (auth.uid() = student_id);
create policy "Mentors read their requests" on mentor_requests for select
  using (
    exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = mentor_requests.mentor_person_id
    )
  );
create policy "Students create requests" on mentor_requests for insert
  with check (auth.uid() = student_id);
create policy "Mentors update request status" on mentor_requests for update
  using (
    exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = mentor_requests.mentor_person_id
    )
  );

-- ── Employer Consortium ──
create table consortium_members (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id),
  company_name text not null,
  tier text not null check (tier in ('partner', 'premier', 'strategic')),
  contact_name text,
  contact_email text,
  starts_at date not null,
  expires_at date not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table consortium_members enable row level security;
create policy "Public read active members" on consortium_members for select using (is_active = true);
create policy "Admins manage consortium" on consortium_members for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- ── Newsletter Subscribers ──
-- Type: alumni (auto-subscribed from people table), student, or friend (external)
create table newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null,
  person_id bigint references people(id),
  type text not null default 'friend' check (type in ('alumni', 'student', 'friend')),
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

create unique index newsletter_email_idx on newsletter_subscribers (lower(email));

alter table newsletter_subscribers enable row level security;
create policy "Public insert newsletter" on newsletter_subscribers for insert with check (true);
create policy "Users read own subscription" on newsletter_subscribers for select
  using (
    lower(email) = lower((select email from auth.users where id = auth.uid()))
  );
create policy "Users update own subscription" on newsletter_subscribers for update
  using (
    lower(email) = lower((select email from auth.users where id = auth.uid()))
  );
create policy "Admins manage newsletter" on newsletter_subscribers for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- ── Seed newsletter_subscribers from existing people + emails ──
-- Auto-subscribe all alumni with their primary email
insert into newsletter_subscribers (email, person_id, type, subscribed_at)
select distinct on (e.person_id)
  e.address,
  e.person_id,
  'alumni',
  now()
from emails e
join people p on p.id = e.person_id
where e.is_valid = true
order by e.person_id, e.source asc, e.last_seen_at desc
on conflict (lower(email)) do nothing;
