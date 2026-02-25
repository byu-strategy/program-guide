-- Admin user setup
-- These faculty/staff emails get auto-promoted to admin role on signup.
-- They don't need people records — they're program administrators, not alumni.

-- Admin email list (used by the trigger to auto-assign role='admin')
create table admin_emails (
  email text primary key
);

insert into admin_emails (email) values
  ('blewis@byu.edu'),
  ('dbryce@byu.edu'),
  ('oldroyd@byu.edu'),
  ('jeff_dyer@byu.edu'),
  ('lena_lizunova@byu.edu'),
  ('mh_hansen@byu.edu'),
  ('ryan.allen@byu.edu'),
  ('tim.gubler@byu.edu'),
  ('scott.murff@byu.edu');

-- No RLS needed — this is a lookup table only used by the trigger
alter table admin_emails enable row level security;
create policy "Admins read admin_emails" on admin_emails for select using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- Update the signup trigger to check admin_emails and assign role='admin'
create or replace function handle_new_user()
returns trigger as $$
declare
  matched_pid bigint;
  is_admin boolean;
begin
  -- Check if this email is in the admin list
  select exists(
    select 1 from public.admin_emails where lower(email) = lower(new.email)
  ) into is_admin;

  -- Try to match to an existing person via emails table
  select e.person_id into matched_pid
  from public.emails e
  where lower(e.address) = lower(new.email)
  limit 1;

  insert into public.user_profiles (id, person_id, role, display_name)
  values (
    new.id,
    matched_pid,
    case when is_admin then 'admin' else 'alumni' end,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Also auto-subscribe admins to newsletter
insert into newsletter_subscribers (email, type)
select email, 'alumni' from admin_emails
on conflict (lower(email)) do nothing;
