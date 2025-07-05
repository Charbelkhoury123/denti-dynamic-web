import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';

export default function Terms() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Theme Toggle FAB */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Terms of Services</h1>
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow p-6">
            <p className="mb-4">By using our website and services, you agree to the following terms and conditions:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>All information provided is for general guidance and does not replace professional advice.</li>
              <li>Appointments are subject to availability and confirmation.</li>
              <li>We reserve the right to update these terms at any time.</li>
            </ul>
            <p>If you have any questions about our terms, please contact us.</p>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}