import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Default dentist ID - in production this would come from env or config
const DEFAULT_DENTIST_ID = 'default';

export interface DentistData {
  id: string;
  business_name: string;
  address: string;
  phone: string;
  place_url: string;
  about_text?: string;
  services?: string[]; // Add this line for the services array
  services_list?: string[];
  working_hours?: string;
  created_at?: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  review: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  display_order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  preferred_time?: string;
  status?: string;
}

export function useDentistData(slug?: string) {
  const [dentist, setDentist] = useState<DentistData | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch dentist data
  const fetchDentistData = async () => {
    try {
      setLoading(true);
      
      // Fetch dentist by slug if provided, otherwise fallback to first record alphabetically
      let dentistQuery: any = supabase
        .from('dentists')
        .select('*')
        .order('business_name', { ascending: true })
        .limit(1);
      if (slug) {
        dentistQuery = dentistQuery.eq('slug', slug);
      }
      const { data: dentistData, error: dentistError } = await dentistQuery.single();

      console.log("Fetched dentist data from Supabase:", dentistData);
      console.log("Services list from database:", dentistData?.services_list);

      if (dentistError) {
        console.error('Error fetching dentist:', dentistError);
        setError('Failed to load dentist information');
        return;
      }

      setDentist(dentistData);

      // Fetch testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('dentist_id', dentistData.id)
        .order('display_order', { ascending: true });

      if (testimonialsError) {
        console.error('Error fetching testimonials:', testimonialsError);
      } else {
        setTestimonials(testimonialsData || []);
      }

      // Fetch FAQs
      const { data: faqsData, error: faqsError } = await supabase
        .from('faqs')
        .select('*')
        .eq('dentist_id', dentistData.id)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (faqsError) {
        console.error('Error fetching FAQs:', faqsError);
      } else {
        setFaqs(faqsData || []);
      }

    } catch (err) {
      console.error('Error in fetchDentistData:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Submit appointment
  const submitAppointment = async (appointmentData: Appointment) => {
    try {
      if (!dentist) {
        throw new Error('Dentist information not loaded');
      }

      const { error } = await supabase
        .from('appointments')
        .insert([{
          ...appointmentData,
          dentist_id: dentist.id
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Appointment Request Submitted",
        description: "We'll contact you soon to confirm your appointment.",
      });

      return { success: true };
    } catch (err) {
      console.error('Error submitting appointment:', err);
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: err };
    }
  };

  // Update dentist data (for admin)
  const updateDentistData = async (updates: Partial<DentistData>) => {
    try {
      if (!dentist) {
        throw new Error('Dentist information not loaded');
      }

      const { error } = await supabase
        .from('dentists')
        .update(updates)
        .eq('id', dentist.id);

      if (error) {
        throw error;
      }

      setDentist(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Success",
        description: "Dentist information updated successfully.",
      });

      return { success: true };
    } catch (err) {
      console.error('Error updating dentist data:', err);
      toast({
        title: "Error",
        description: "Failed to update information. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchDentistData();
  }, [slug]);

  return {
    dentist,
    testimonials,
    faqs,
    loading,
    error,
    submitAppointment,
    updateDentistData,
    refetch: fetchDentistData
  };
}