import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Help() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">How do I reset my password?</h2>
              <p>Click on the 'Forgot Password' link on the login page and follow the instructions.</p>
            </div>
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">How do I contact support?</h2>
              <p>You can reach our support team via the contact form or by calling our office during business hours.</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}