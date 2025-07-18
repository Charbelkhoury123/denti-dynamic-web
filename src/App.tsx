import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DentistWebsite from "./pages/DentistWebsite";
import Faqs from "./pages/Faqs";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import ServicesList from "./pages/ServicesList";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Root route - shows default dentist website */}
          <Route path="/" element={<Index />} />
          
          {/* Global pages (not clinic-specific) */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/features" element={<Features />} />
          
          {/* Clinic-specific routes with slug */}
          <Route path="/:slug" element={<DentistWebsite />}>
            {/* Nested routes that preserve the clinic slug */}
            <Route path="about" element={<About />} />
            <Route path="services" element={<ServicesList />} />
            <Route path="services/:serviceSlug" element={<Service />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;