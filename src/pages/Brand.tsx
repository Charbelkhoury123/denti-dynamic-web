import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Brand() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Brand Assets & Guidelines</h1>
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow p-6">
            <p className="mb-4">Download our logo and see our brand guidelines below:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Logo usage: Maintain clear space and do not alter colors.</li>
              <li>Primary color: <span className="font-semibold text-primary">#3B82F6</span></li>
              <li>Typography: Use Inter for headings and body text.</li>
            </ul>
            <a href="#" className="text-primary underline">Download Logo</a>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}