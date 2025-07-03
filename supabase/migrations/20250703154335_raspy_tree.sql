/*
  # Add slug field to dentists table

  1. New Columns
    - `slug` (text, unique, not null) - URL-friendly identifier for dentists
  
  2. Data Migration
    - Generate unique slugs for existing records based on business_name
    - Handle duplicate slugs by appending numbers
  
  3. Constraints
    - Add unique constraint on slug
    - Add index for performance
*/

-- Add slug column to dentists table
ALTER TABLE public.dentists ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create a simple function to clean text for slugs
CREATE OR REPLACE FUNCTION clean_slug_text(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  IF input_text IS NULL OR TRIM(input_text) = '' THEN
    RETURN 'dentist-practice';
  END IF;
  
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(TRIM(input_text), '[^a-zA-Z0-9\s]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '^-+|-+$', '', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Update existing records with slugs
UPDATE public.dentists 
SET slug = clean_slug_text(business_name)
WHERE slug IS NULL;

-- Handle any potential duplicates by adding numbers
DO $$
DECLARE
  rec RECORD;
  new_slug TEXT;
  counter INTEGER;
BEGIN
  -- Find any duplicate slugs
  FOR rec IN 
    SELECT slug, array_agg(id) as ids
    FROM public.dentists 
    WHERE slug IS NOT NULL
    GROUP BY slug 
    HAVING COUNT(*) > 1
  LOOP
    counter := 2;
    -- Update all but the first record with the duplicate slug
    FOR i IN 2..array_length(rec.ids, 1) LOOP
      new_slug := rec.slug || '-' || counter;
      
      -- Make sure this new slug doesn't already exist
      WHILE EXISTS (SELECT 1 FROM public.dentists WHERE slug = new_slug) LOOP
        counter := counter + 1;
        new_slug := rec.slug || '-' || counter;
      END LOOP;
      
      UPDATE public.dentists 
      SET slug = new_slug 
      WHERE id = rec.ids[i];
      
      counter := counter + 1;
    END LOOP;
  END LOOP;
END $$;

-- Ensure no null slugs remain (fallback)
UPDATE public.dentists 
SET slug = 'dentist-practice-' || EXTRACT(EPOCH FROM created_at)::INTEGER
WHERE slug IS NULL OR slug = '';

-- Make slug not null
ALTER TABLE public.dentists 
ALTER COLUMN slug SET NOT NULL;

-- Add unique constraint on slug
ALTER TABLE public.dentists 
ADD CONSTRAINT dentists_slug_unique UNIQUE (slug);

-- Create index on slug for better query performance
CREATE INDEX IF NOT EXISTS idx_dentists_slug ON public.dentists(slug);

-- Clean up the helper function
DROP FUNCTION IF EXISTS clean_slug_text(TEXT);