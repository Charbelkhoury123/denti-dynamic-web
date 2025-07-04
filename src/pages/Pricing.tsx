import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-primary underline">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
      </nav>
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
    </div>
  );
} 