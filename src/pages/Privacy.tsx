import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { ResponsiveNavbar } from '@/components/ui/responsive-navbar';

export default function Privacy() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Theme Toggle FAB */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Responsive Navbar */}
        <ResponsiveNavbar />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow p-6">
            <p className="mb-4">We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>We only collect information necessary for your care and our services.</li>
              <li>Your data is never sold or shared with third parties without your consent.</li>
              <li>We use secure systems to store and process your information.</li>
            </ul>
            <p>If you have any questions about our privacy practices, please contact us.</p>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}