import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Testimonials() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Testimonials</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">😊</div>
              <p className="mb-2">"The staff was incredibly friendly and made me feel at ease. Highly recommend!"</p>
              <span className="font-semibold text-primary">- Sarah M.</span>
            </div>
            <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">😁</div>
              <p className="mb-2">"State-of-the-art technology and gentle care. My teeth have never felt better!"</p>
              <span className="font-semibold text-primary">- John D.</span>
            </div>
            <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-4">👍</div>
              <p className="mb-2">"Professional and caring team. I finally enjoy going to the dentist!"</p>
              <span className="font-semibold text-primary">- Emily R.</span>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}