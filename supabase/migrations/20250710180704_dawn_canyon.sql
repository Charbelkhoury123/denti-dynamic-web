/*
  # Add test services data to dentists table

  1. Data Updates
    - Update existing dentist records with sample services
    - Ensure services_list array is populated with common dental services
  
  2. Services Added
    - General Dentistry
    - Cosmetic Dentistry
    - Orthodontics
    - Emergency Care
    - Teeth Cleaning
    - Dental Implants
*/

-- Update existing dentist records with sample services if they don't have any
UPDATE public.dentists 
SET services_list = ARRAY[
  'General Dentistry',
  'Cosmetic Dentistry', 
  'Orthodontics',
  'Emergency Care',
  'Teeth Cleaning',
  'Dental Implants',
  'Root Canal Treatment',
  'Teeth Whitening'
]
WHERE services_list IS NULL OR array_length(services_list, 1) IS NULL;

-- If no dentist records exist, create a default one
INSERT INTO public.dentists (
  business_name,
  address,
  phone,
  place_url,
  about_text,
  services_list,
  working_hours,
  slug
)
SELECT 
  'DentalCare Practice',
  '123 Main Street, Anytown, USA 12345',
  '(555) 123-4567',
  'https://maps.google.com',
  'We provide comprehensive dental care with state-of-the-art technology and a caring team.',
  ARRAY[
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Emergency Care',
    'Teeth Cleaning',
    'Dental Implants',
    'Root Canal Treatment',
    'Teeth Whitening'
  ],
  'Monday: 8:00 AM - 6:00 PM | Tuesday: 8:00 AM - 6:00 PM | Wednesday: 8:00 AM - 6:00 PM | Thursday: 8:00 AM - 6:00 PM | Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 4:00 PM | Sunday: Emergency Only',
  'dentalcare-practice'
WHERE NOT EXISTS (SELECT 1 FROM public.dentists LIMIT 1);