import React from "react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/ui/footer-section';
import { Navbar1 } from '@/components/ui/navbar-1';

export default function Pricing() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">Pricing</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-card rounded-xl shadow">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left">Service</th>
                  <th className="py-3 px-6 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-6">Routine Checkup</td>
                  <td className="py-3 px-6">$50</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-6">Teeth Cleaning</td>
                  <td className="py-3 px-6">$80</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-6">Dental Filling</td>
                  <td className="py-3 px-6">$120</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-6">Root Canal</td>
                  <td className="py-3 px-6">$350</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-6">Teeth Whitening</td>
                  <td className="py-3 px-6">$200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}