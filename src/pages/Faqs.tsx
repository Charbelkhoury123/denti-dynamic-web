import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Faqs() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Theme Toggle FAB */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navbar */}
        <Navbar1 />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">What services do you offer?</h2>
              <p>We offer a full range of dental services, including checkups, cleanings, fillings, root canals, whitening, and more.</p>
            </div>
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">Do you accept insurance?</h2>
              <p>Yes, we accept most major dental insurance plans. Please contact us for details.</p>
            </div>
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">How do I book an appointment?</h2>
              <p>You can book an appointment by calling our office or using our online booking form.</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}