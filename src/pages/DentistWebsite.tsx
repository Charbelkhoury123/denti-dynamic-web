import { useState } from 'react';
import { useDentistData } from '@/hooks/useDentistData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import StaticHomepageContent from '@/components/sections/StaticHomepageContent';
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

  // Debug log to check services data
  console.log("DentistWebsite - dentist data:", dentist);
  console.log("DentistWebsite - services_list:", dentist?.services_list);

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
        <ResponsiveNavbar 
          services={dentist?.services_list || []} 
          businessName={dentist?.business_name} 
        />

        {/* Conditional rendering based on route */}
        {isNestedRoute ? (
          /* Render nested route content */
          <main className="pt-4">
            <Outlet />
          </main>
        ) : (
          /* Render main clinic page content */
          <StaticHomepageContent
            dentist={dentist}
            testimonials={testimonials}
            submitAppointment={submitAppointment}
            onBookAppointment={handleBookAppointment}
          />
        )}
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}