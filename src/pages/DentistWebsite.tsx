import { useState } from 'react';
import { useDentistData } from '@/hooks/useDentistData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';

export default function DentistWebsite() {
  const { dentist, testimonials, faqs, loading, submitAppointment } = useDentistData();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background smooth-scroll">
        {/* Theme Toggle FAB */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <Hero dentist={dentist} onBookAppointment={handleBookAppointment} />
        <About dentist={dentist} />
        <Services dentist={dentist} />
        
        {/* Additional sections would go here: Testimonials, FAQ, Contact, etc. */}
      </div>
    </ThemeProvider>
  );
}