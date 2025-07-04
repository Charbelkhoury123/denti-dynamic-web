-- Create appointments table for contact form submissions
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dentist_id UUID REFERENCES public.dentists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dentist_id UUID REFERENCES public.dentists(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dentist_id UUID REFERENCES public.dentists(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointments
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update appointments" 
ON public.appointments 
FOR UPDATE 
USING (true);

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (true);

-- RLS Policies for FAQs
CREATE POLICY "Anyone can view active FAQs" 
ON public.faqs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage FAQs" 
ON public.faqs 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for a dentist practice
INSERT INTO public.dentists (
  business_name,
  address,
  phone,
  place_url,
  about_text,
  services_list,
  working_hours
) VALUES (
  'Bright Smile Dental',
  '123 Main Street, Downtown, NY 10001',
  '+1 (555) 123-4567',
  'https://maps.google.com/?q=123+Main+Street+Downtown+NY',
  'At Bright Smile Dental, we are dedicated to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced professionals uses the latest technology and techniques to ensure you receive the best possible treatment. We believe that everyone deserves a healthy, beautiful smile, and we are committed to helping you achieve and maintain optimal oral health.',
  ARRAY['General Dentistry', 'Teeth Cleaning', 'Dental Fillings', 'Root Canal Treatment', 'Dental Crowns', 'Teeth Whitening', 'Dental Implants', 'Orthodontics', 'Periodontal Treatment', 'Emergency Dental Care'],
  'Monday: 9:00 AM - 6:00 PM\nTuesday: 9:00 AM - 6:00 PM\nWednesday: 9:00 AM - 6:00 PM\nThursday: 9:00 AM - 6:00 PM\nFriday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed'
);

-- Insert sample testimonials
INSERT INTO public.testimonials (dentist_id, patient_name, review, rating, is_featured, display_order)
SELECT 
  d.id,
  patient_name,
  review,
  rating,
  is_featured,
  display_order
FROM public.dentists d,
(VALUES 
  ('Sarah Johnson', 'Dr. Smith and his team are absolutely wonderful! The office is modern and clean, and they made me feel comfortable throughout my entire visit. Highly recommended!', 5, true, 1),
  ('Michael Chen', 'I had been avoiding the dentist for years, but the staff here made the experience so pleasant. They explained everything clearly and were very gentle.', 5, true, 2),
  ('Emily Rodriguez', 'Great dental practice! They use the latest technology and the results speak for themselves. My teeth have never looked better.', 5, true, 3),
  ('David Thompson', 'Professional, caring, and efficient. The appointment scheduling is easy and they respect your time. Will definitely be returning.', 4, false, 4)
) AS t(patient_name, review, rating, is_featured, display_order)
WHERE d.business_name = 'Bright Smile Dental';

-- Insert sample FAQs
INSERT INTO public.faqs (dentist_id, question, answer, display_order)
SELECT 
  d.id,
  question,
  answer,
  display_order
FROM public.dentists d,
(VALUES 
  ('How often should I visit the dentist?', 'We recommend visiting the dentist every 6 months for regular check-ups and cleanings. However, some patients may need more frequent visits based on their individual oral health needs.', 1),
  ('Do you accept insurance?', 'Yes, we accept most major dental insurance plans. Our staff will help verify your benefits and maximize your coverage. We also offer flexible payment options for uninsured patients.', 2),
  ('What should I expect during my first visit?', 'Your first visit will include a comprehensive examination, digital X-rays if needed, and a thorough cleaning. We will discuss your oral health goals and create a personalized treatment plan.', 3),
  ('Do you offer emergency dental services?', 'Yes, we provide emergency dental care for urgent situations. Please call our office immediately if you experience severe pain, trauma, or other dental emergencies.', 4),
  ('How can I maintain good oral health at home?', 'Brush twice daily with fluoride toothpaste, floss daily, use mouthwash, maintain a balanced diet, and avoid tobacco products. Regular dental visits are also essential.', 5)
) AS f(question, answer, display_order)
WHERE d.business_name = 'Bright Smile Dental';