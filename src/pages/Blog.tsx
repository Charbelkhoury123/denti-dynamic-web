import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Blog() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-2">5 Tips for a Healthier Smile</h2>
              <p className="mb-2 text-muted-foreground">April 10, 2024</p>
              <p>Discover simple daily habits that can make a big difference in your oral health.</p>
            </div>
            <div className="bg-card rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-2">Understanding Dental Implants</h2>
              <p className="mb-2 text-muted-foreground">March 28, 2024</p>
              <p>Learn about the benefits and process of dental implants for missing teeth.</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}