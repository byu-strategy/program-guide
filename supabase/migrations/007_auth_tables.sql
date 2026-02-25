-- Auth infrastructure: user_profiles, auto-match trigger
-- Links Supabase auth.users to existing people records via email lookup

-- ── User Profiles ──
create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  person_id bigint references people(id),
  role text not null default 'alumni' check (role in ('student', 'alumni', 'employer', 'admin')),
  display_name text,
  created_at timestamptz default now()
);

create unique index user_profiles_person_id_idx on user_profiles (person_id) where person_id is not null;

-- ── RLS ──
alter table user_profiles enable row level security;

create policy "Users read own profile"
  on user_profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on user_profiles for update
  using (auth.uid() = id);

create policy "Admins read all"
  on user_profiles for select
  using (
    exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
  );

-- ── RLS updates for people: alumni can update own record ──
create policy "Alumni update own person"
  on people for update
  using (
    exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = people.id
    )
  );

-- ── RLS updates for experience: alumni can manage own self-reported records ──
create policy "Alumni insert own experience"
  on experience for insert
  with check (
    exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = experience.person_id
    )
  );

create policy "Alumni update own self experience"
  on experience for update
  using (
    source = 'self' and exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = experience.person_id
    )
  );

create policy "Alumni delete own self experience"
  on experience for delete
  using (
    source = 'self' and exists (
      select 1 from user_profiles up
      where up.id = auth.uid() and up.person_id = experience.person_id
    )
  );

-- ── Auto-match on signup ──
-- When a new user signs up, look up their email in our emails table
-- and link their profile to the matching person record
create or replace function handle_new_user()
returns trigger as $$
declare matched_pid bigint;
begin
  select e.person_id into matched_pid
  from emails e
  where lower(e.address) = lower(new.email)
  limit 1;

  insert into user_profiles (id, person_id, role, display_name)
  values (
    new.id,
    matched_pid,
    case when matched_pid is not null then 'alumni' else 'alumni' end,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
