-- ============================================================================
-- First Job Post-Graduation Analysis
-- ============================================================================
--
-- PROBLEM:
--   Experience dates are messy (YYYY, YYYY-MM, YYYY-MM-DD, or NULL).
--   We need to determine each person's first real job after graduating from BYU.
--   "sort_order=0" in PDL means "primary/current job", NOT chronological first.
--   BYU education end_dates are often year-only (e.g. "2015").
--
-- APPROACH:
--   1. Normalize all dates to a comparable format (YYYY-MM-01)
--   2. Determine graduation date from education table (BYU end_date) or cohort_year
--   3. Filter experience to post-graduation, non-campus, non-intern roles
--   4. Rank by normalized start_date ascending → rank=1 is first job
--
-- ASSUMPTIONS:
--   - Year-only start_date (e.g. "2015") → assume January: "2015-01"
--     (conservative: ensures we don't accidentally exclude early-year jobs)
--   - Year-only BYU end_date (e.g. "2015") → assume April: "2015-04"
--     (BYU graduation is typically April; using April means a job starting
--      in the same year needs to start May+ to count as post-grad)
--   - NULL start_date (only 16 rows) → excluded from first-job candidates
--   - NULL BYU end_date (125 people) → fall back to cohort_year+2 (April)
--   - Registrar grad_date (365 people) is preferred over PDL when available
--   - end_date IS NULL on experience → means currently employed there
--
-- OUTPUT:
--   Creates two views:
--     graduation_dates  — one row per person with their estimated graduation date
--     first_post_grad_job — one row per person: their first job after BYU
-- ============================================================================


-- ── View 1: Graduation Dates ──
-- For each person, determine their graduation date using this priority:
--   1. Registrar data (people.grad_date) — exact semester from BYU export (365 people)
--   2. PDL education end_date for BYU — inferred from LinkedIn (latest non-grad degree)
--   3. cohort_year + 2 years — last resort fallback (cohort_year is admit year, not grad)

CREATE OR REPLACE VIEW graduation_dates AS
WITH byu_education AS (
    SELECT
        e.person_id,
        e.school_name,
        e.degree,
        e.end_date AS raw_end_date,
        -- Normalize BYU end_date to YYYY-MM format
        CASE
            -- YYYY format → assume April (spring graduation)
            WHEN e.end_date ~ '^\d{4}$'
                THEN e.end_date || '-04'
            -- YYYY-MM format → use as-is
            WHEN e.end_date ~ '^\d{4}-\d{2}$'
                THEN e.end_date
            -- YYYY-MM-DD format → truncate to YYYY-MM
            WHEN e.end_date ~ '^\d{4}-\d{2}-\d{2}$'
                THEN LEFT(e.end_date, 7)
            -- NULL → will fall back to cohort_year
            ELSE NULL
        END AS normalized_end_date
    FROM education e
    WHERE LOWER(e.school_name) LIKE '%brigham young%'
      -- Exclude MBA/graduate degrees at BYU — we want undergrad graduation
      AND (e.degree IS NULL OR LOWER(e.degree) NOT LIKE '%master%')
      AND (e.degree IS NULL OR LOWER(e.degree) NOT LIKE '%mba%')
      AND (e.degree IS NULL OR LOWER(e.degree) NOT LIKE '%doctor%')
)
SELECT
    p.id AS person_id,
    p.cohort_year,
    p.grad_date AS registrar_grad_date,
    byu.normalized_end_date AS pdl_grad_date,
    -- Final graduation date: prefer registrar, then PDL education, then cohort_year+2
    COALESCE(
        p.grad_date,
        byu.normalized_end_date,
        (p.cohort_year + 2)::TEXT || '-04'
    ) AS grad_date
FROM people p
LEFT JOIN (
    -- Take the latest BYU graduation date per person
    SELECT DISTINCT ON (person_id)
        person_id,
        normalized_end_date
    FROM byu_education
    WHERE normalized_end_date IS NOT NULL
    ORDER BY person_id, normalized_end_date DESC
) byu ON byu.person_id = p.id;


-- ── View 2: First Post-Graduation Job ──
-- For each person, find their first real job after graduation.
-- Excludes: internships, campus roles, student jobs, missions.
-- Ranks remaining jobs by start_date ascending; rank=1 is the first job.

CREATE OR REPLACE VIEW first_post_grad_job AS
WITH normalized_experience AS (
    SELECT
        ex.id AS experience_id,
        ex.person_id,
        ex.company_name,
        ex.job_title,
        ex.start_date AS raw_start_date,
        ex.end_date AS raw_end_date,
        ex.company_industry,
        ex.company_size,
        ex.role_bucket,
        ex.sort_order,
        -- Normalize start_date to YYYY-MM
        CASE
            WHEN ex.start_date ~ '^\d{4}$'
                THEN ex.start_date || '-01'
            WHEN ex.start_date ~ '^\d{4}-\d{2}$'
                THEN ex.start_date
            WHEN ex.start_date ~ '^\d{4}-\d{2}-\d{2}$'
                THEN LEFT(ex.start_date, 7)
            ELSE NULL
        END AS norm_start,
        -- Normalize end_date to YYYY-MM (NULL = current job)
        CASE
            WHEN ex.end_date ~ '^\d{4}$'
                THEN ex.end_date || '-12'
            WHEN ex.end_date ~ '^\d{4}-\d{2}$'
                THEN ex.end_date
            WHEN ex.end_date ~ '^\d{4}-\d{2}-\d{2}$'
                THEN LEFT(ex.end_date, 7)
            ELSE NULL
        END AS norm_end
    FROM experience ex
),
-- Join with graduation dates
with_grad AS (
    SELECT
        ne.*,
        gd.grad_date,
        gd.cohort_year
    FROM normalized_experience ne
    JOIN graduation_dates gd ON gd.person_id = ne.person_id
    WHERE ne.norm_start IS NOT NULL       -- must have a start date
      AND gd.grad_date IS NOT NULL        -- must have a graduation date
      AND ne.norm_start >= gd.grad_date   -- job started at or after graduation
),
-- Filter out campus/student/intern roles
filtered AS (
    SELECT *
    FROM with_grad
    WHERE TRUE
      -- Exclude intern/student titles
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%intern%'
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%teaching assistant%'
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%research assistant%'
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%student%'
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%volunteer%'
      AND LOWER(COALESCE(job_title, '')) NOT LIKE '%missionary%'
      -- Exclude BYU campus employers
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%brigham young%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%byu %'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE 'byu-%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%marriott school%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%cougar consulting%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%sandbox%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%ballard center%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%social venture academy%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%byu business strategy%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%byu management society%'
      AND LOWER(COALESCE(company_name, '')) NOT LIKE '%missionary training center%'
      -- Church HQ roles are legitimate strategy careers — keep them
),
-- Rank jobs by start_date ascending within each person
ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY person_id
            ORDER BY norm_start ASC, sort_order DESC  -- earliest date first; if tied, higher sort_order = earlier in PDL
        ) AS job_rank
    FROM filtered
)
SELECT
    r.person_id,
    p.first_name,
    p.last_name,
    r.cohort_year,
    p.type,
    r.grad_date,
    r.job_rank,
    r.company_name,
    r.job_title,
    r.raw_start_date,
    r.raw_end_date,
    r.norm_start,
    r.norm_end,
    r.company_industry,
    r.company_size,
    -- LLM-classified role bucket (function-based, lives on experience table)
    r.role_bucket
FROM ranked r
JOIN people p ON p.id = r.person_id
WHERE r.job_rank <= 3;  -- keep first 3 jobs for transition analysis


-- ============================================================================
-- SAMPLE QUERIES (run these after creating the views)
-- ============================================================================

-- First job industry distribution:
--   SELECT role_bucket, COUNT(*) AS n
--   FROM first_post_grad_job
--   WHERE job_rank = 1
--   GROUP BY role_bucket
--   ORDER BY n DESC;

-- First job top companies:
--   SELECT company_name, COUNT(*) AS n
--   FROM first_post_grad_job
--   WHERE job_rank = 1
--   GROUP BY company_name
--   ORDER BY n DESC
--   LIMIT 25;

-- First job by cohort era:
--   SELECT
--     CASE
--       WHEN cohort_year BETWEEN 2007 AND 2012 THEN '2007-2012'
--       WHEN cohort_year BETWEEN 2013 AND 2016 THEN '2013-2016'
--       WHEN cohort_year BETWEEN 2017 AND 2020 THEN '2017-2020'
--       WHEN cohort_year BETWEEN 2021 AND 2025 THEN '2021-2025'
--     END AS era,
--     role_bucket,
--     COUNT(*) AS n
--   FROM first_post_grad_job
--   WHERE job_rank = 1
--   GROUP BY era, role_bucket
--   ORDER BY era, n DESC;

-- Transition: first job → second job:
--   SELECT
--     j1.role_bucket AS first_job,
--     j2.role_bucket AS second_job,
--     COUNT(*) AS n
--   FROM first_post_grad_job j1
--   JOIN first_post_grad_job j2
--     ON j1.person_id = j2.person_id
--     AND j1.job_rank = 1
--     AND j2.job_rank = 2
--   GROUP BY j1.role_bucket, j2.role_bucket
--   ORDER BY j1.role_bucket, n DESC;

-- Spot check: see a person's graduation date + first jobs:
--   SELECT * FROM first_post_grad_job
--   WHERE first_name = 'Alex' AND last_name = 'Burton'
--   ORDER BY job_rank;
