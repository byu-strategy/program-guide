-- Alumni Self-Service & Incremental Refresh Support
-- Adds source tracking to experience, self-edit timestamps to people,
-- and new alumni-only profile fields.

-- ── Experience: track data source ──
-- 'pdl' = from PDL enrichment, 'self' = alumni self-reported
alter table experience
  add column if not exists source text not null default 'pdl';

alter table experience
  add constraint experience_source_check check (source in ('pdl', 'self'));

-- ── People: alumni self-service fields ──
-- self_updated_at: set when alumni edits their own profile.
-- PDL refresh skips overwriting fields when self_updated_at > last_enriched_at.
alter table people
  add column if not exists self_updated_at timestamptz;

-- Alumni-only profile fields (PDL never touches these)
alter table people
  add column if not exists bio text,
  add column if not exists mentor_available boolean default false,
  add column if not exists contact_preference text check (contact_preference in ('email', 'linkedin', 'none')),
  add column if not exists profile_photo_url text;

-- ── Index: speed up source-filtered queries on experience ──
create index if not exists experience_source_idx on experience (person_id, source)
  where removed_at is null;
