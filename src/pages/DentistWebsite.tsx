import { useState } from 'react';
import { useDentistData } from '@/hooks/useDentistData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Footer } from '@/components/ui/footer-section';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { ResponsiveNavbar } from '@/components/ui/responsive-navbar';

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

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background smooth-scroll">
        {/* Responsive Navbar - always visible */}
        <ResponsiveNavbar services={dentist?.services_list} />

        {/* Conditional rendering based on route */}
        {isNestedRoute ? (
          /* Render nested route content */
          <main className="pt-4">
            <Outlet />
          </main>
        ) : (
          /* Render main clinic page content */
          <>
            <Hero dentist={dentist} onBookAppointment={handleBookAppointment} />
            <About dentist={dentist} className="mb-12 lg:mb-16" />
            <Services dentist={dentist} />
          </>
        )}
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}