-- Add 'registrar' to emails source check constraint
ALTER TABLE emails DROP CONSTRAINT IF EXISTS emails_source_check;
ALTER TABLE emails ADD CONSTRAINT emails_source_check
  CHECK (source IN ('alumni_db', 'survey', 'pdl', 'applicant', 'manual', 'registrar'));
