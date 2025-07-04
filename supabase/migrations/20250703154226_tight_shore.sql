/*
  # Add slug field to dentists table

  1. New Column
    - `slug` (text, unique, not null)
      - URL-friendly identifier for each dentist practice
      - Generated from business name with proper uniqueness handling

  2. Data Migration
    - Generate unique slugs for existing records
    - Handle duplicate slug scenarios with numbering

  3. Constraints & Indexes
    - Add unique constraint on slug
    - Add index for performance
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

-- Function to generate unique slugs
CREATE OR REPLACE FUNCTION generate_unique_slug(base_slug TEXT, table_name TEXT, column_name TEXT, exclude_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
  final_slug TEXT;
  counter INTEGER := 1;
  query_text TEXT;
  slug_exists BOOLEAN;
BEGIN
  final_slug := base_slug;
  
  LOOP
    -- Build dynamic query to check if slug exists
    query_text := format('SELECT EXISTS(SELECT 1 FROM %I WHERE %I = $1', table_name, column_name);
    
    -- Add exclusion for current record if updating
    IF exclude_id IS NOT NULL THEN
      query_text := query_text || ' AND id != $2';
    END IF;
    
    query_text := query_text || ')';
    
    -- Execute the query
    IF exclude_id IS NOT NULL THEN
      EXECUTE query_text INTO slug_exists USING final_slug, exclude_id;
    ELSE
      EXECUTE query_text INTO slug_exists USING final_slug;
    END IF;
    
    -- If slug doesn't exist, we can use it
    IF NOT slug_exists THEN
      EXIT;
    END IF;
    
    -- Generate next variant
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing records with unique slugs
DO $$
DECLARE
  dentist_record RECORD;
  base_slug TEXT;
  unique_slug TEXT;
BEGIN
  FOR dentist_record IN SELECT id, business_name FROM public.dentists WHERE slug IS NULL
  LOOP
    -- Generate base slug from business name
    base_slug := LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(business_name, '[^a-zA-Z0-9\s]', '', 'g'),
          '\s+', '-', 'g'
        ),
        '^-+|-+$', '', 'g'
      )
    );
    
    -- Ensure base slug is not empty
    IF base_slug = '' OR base_slug IS NULL THEN
      base_slug := 'dentist-practice';
    END IF;
    
    -- Generate unique slug
    unique_slug := generate_unique_slug(base_slug, 'dentists', 'slug', dentist_record.id);
    
    -- Update the record
    UPDATE public.dentists 
    SET slug = unique_slug 
    WHERE id = dentist_record.id;
  END LOOP;
END $$;

-- Make slug not null
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

-- Clean up the helper function
DROP FUNCTION IF EXISTS generate_unique_slug(TEXT, TEXT, TEXT, UUID);