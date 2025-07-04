import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Changelog() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Changelog</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">v1.1.0 - April 2024</h2>
              <ul className="list-disc pl-6">
                <li>Added new patient portal feature</li>
                <li>Improved appointment booking flow</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">v1.0.0 - March 2024</h2>
              <ul className="list-disc pl-6">
                <li>Initial launch of the dental website</li>
                <li>Core features and information pages</li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}