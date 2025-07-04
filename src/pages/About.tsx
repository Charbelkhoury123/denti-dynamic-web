import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function About() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow p-6">
            <p className="mb-4">We are dedicated to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced professionals uses the latest technology and techniques to ensure you receive the best possible treatment.</p>
            <p className="mb-4">Our mission is to help you achieve and maintain a healthy, beautiful smile for life. We believe in personalized care and building long-term relationships with our patients.</p>
            <p>Thank you for choosing us as your dental care provider!</p>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}