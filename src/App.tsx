import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path=":slug" element={<DentistWebsite />}>
            <Route path="services/:serviceSlug" element={<Service />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="testimonials" element={<Testimonials />} />
          </Route>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
