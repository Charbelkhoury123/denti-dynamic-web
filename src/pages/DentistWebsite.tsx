import { useState } from 'react';
import { useDentistData } from '@/hooks/useDentistData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Footer } from '@/components/ui/footer-section';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function DentistWebsite() {
  const { slug } = useParams();
  const location = useLocation();
  const { dentist, testimonials, faqs, loading, submitAppointment } = useDentistData(slug);
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

  // Check if we're on a nested route (not the main clinic page)
  const isNestedRoute = location.pathname !== `/${slug}` && location.pathname !== '/';

  console.log("Dentist object:", dentist);
  console.log("Dentist services:", dentist?.services);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background smooth-scroll">
        {/* Theme Toggle FAB */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navbar - always visible */}
        <Navbar1 services={dentist?.services_list} />

        {/* Conditional rendering based on route */}
        {isNestedRoute ? (
          /* Render nested route content */
          <Outlet />
        ) : (
          /* Render main clinic page content */
          <>
            <Hero dentist={dentist} onBookAppointment={handleBookAppointment} />
            <About dentist={dentist} />
            <Services dentist={dentist} />
          </>
        )}
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}