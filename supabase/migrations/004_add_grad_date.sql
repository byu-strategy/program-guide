-- Add actual graduation date to people table
-- Format: YYYY-MM (e.g., "2023-04" for Winter 2023)
-- Source: BYU registrar export (studentExportGradSemester.csv)
ALTER TABLE people ADD COLUMN IF NOT EXISTS grad_date TEXT;
