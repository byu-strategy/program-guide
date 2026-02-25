-- Alumni Database Schema
-- Normalized schema for PDL-enriched alumni data with yearly refresh support

-- ── People ──
create table people (
  id bigint generated always as identity primary key,
  cohort_year smallint,
  first_name text not null,
  last_name text not null,
  netid text,
  linkedin_url text,
  linkedin_slug text generated always as (
    lower(regexp_replace(regexp_replace(linkedin_url, '^https?://(www\.)?linkedin\.com/in/', ''), '[?#/].*$', ''))
  ) stored,
  type text check (type in ('Major', 'Minor', 'Major (Survey)')),
  pdl_id text,
  sex text,
  birth_year smallint,
  industry text,
  current_job_title text,
  current_company text,
  location_city text,
  location_state text,
  location_country text,
  location_geo text,
  last_enriched_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index people_linkedin_slug_idx on people (linkedin_slug) where linkedin_slug is not null and linkedin_slug != '';
create unique index people_netid_idx on people (netid) where netid is not null and netid != '';
create index people_cohort_year_idx on people (cohort_year);
create index people_pdl_id_idx on people (pdl_id) where pdl_id is not null;

-- ── Emails ──
create table emails (
  id bigint generated always as identity primary key,
  person_id bigint not null references people (id) on delete cascade,
  address text not null,
  type text check (type in ('personal', 'professional', 'work', 'other')),
  source text check (source in ('alumni_db', 'survey', 'pdl', 'applicant', 'manual')),
  is_valid boolean default true,
  first_seen_at timestamptz default now(),
  last_seen_at timestamptz default now()
);

create unique index emails_person_address_idx on emails (person_id, lower(address));
create index emails_person_id_idx on emails (person_id);

-- ── Experience ──
create table experience (
  id bigint generated always as identity primary key,
  person_id bigint not null references people (id) on delete cascade,
  sort_order smallint,
  company_name text,
  job_title text,
  start_date text,
  end_date text,
  is_current boolean default false,
  company_industry text,
  company_size text,
  company_website text,
  company_linkedin_url text,
  pdl_job_last_changed text,
  first_seen_at timestamptz default now(),
  last_seen_at timestamptz default now(),
  removed_at timestamptz
);

create index experience_person_id_idx on experience (person_id);
create unique index experience_dedup_idx on experience (person_id, company_name, job_title, start_date)
  where removed_at is null;

-- ── Education ──
create table education (
  id bigint generated always as identity primary key,
  person_id bigint not null references people (id) on delete cascade,
  sort_order smallint,
  school_name text,
  degree text,
  major text,
  start_date text,
  end_date text,
  first_seen_at timestamptz default now(),
  last_seen_at timestamptz default now()
);

create index education_person_id_idx on education (person_id);
create unique index education_dedup_idx on education (person_id, school_name, degree, major);

-- ── Skills ──
create table skills (
  id bigint generated always as identity primary key,
  person_id bigint not null references people (id) on delete cascade,
  skill_name text not null,
  first_seen_at timestamptz default now(),
  last_seen_at timestamptz default now()
);

create unique index skills_dedup_idx on skills (person_id, lower(skill_name));
create index skills_person_id_idx on skills (person_id);

-- ── Updated_at trigger ──
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger people_updated_at
  before update on people
  for each row execute function update_updated_at();

-- ── Row Level Security ──
alter table people enable row level security;
alter table emails enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table skills enable row level security;

-- Public read access (adjust later for auth)
create policy "Public read people" on people for select using (true);
create policy "Public read emails" on emails for select using (true);
create policy "Public read experience" on experience for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read skills" on skills for select using (true);
