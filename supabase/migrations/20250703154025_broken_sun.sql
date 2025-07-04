/*
  # Add slug field to dentists table

  1. Changes
    - Add `slug` column to `dentists` table
    - Make slug unique to prevent conflicts
    - Add index for better query performance
    - Update existing record with a default slug

  2. Notes
    - Slug will be used for URL routing (e.g., /dentist/bright-smile-dental)
    - Existing data will get a default slug based on business name
    - Future records should have slugs generated from business names
*/

-- Add slug column to dentists table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dentists' AND column_name = 'slug'
  ) THEN
    ALTER TABLE public.dentists ADD COLUMN slug TEXT;
  END IF;
END $$;

-- Update existing records with default slugs based on business name
UPDATE public.dentists 
SET slug = LOWER(REPLACE(REPLACE(business_name, ' ', '-'), '''', ''))
WHERE slug IS NULL;

-- Make slug unique and not null
ALTER TABLE public.dentists 
ALTER COLUMN slug SET NOT NULL;

-- Add unique constraint on slug
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'dentists' AND constraint_name = 'dentists_slug_unique'
  ) THEN
    ALTER TABLE public.dentists ADD CONSTRAINT dentists_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Create index on slug for better query performance
CREATE INDEX IF NOT EXISTS idx_dentists_slug ON public.dentists(slug);