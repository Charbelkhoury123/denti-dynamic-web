/*
  # Remove logo_url column from dentists table

  1. Changes
    - Remove `logo_url` column from `dentists` table
    - This column is no longer needed in the schema
*/

-- Remove logo_url column from dentists table
ALTER TABLE public.dentists DROP COLUMN IF EXISTS logo_url;