import React from "react";
import { Link } from "react-router-dom";

export default function Changelog() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex flex-wrap gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
        <Link to="/faqs" className="font-semibold text-muted-foreground hover:text-primary transition-colors">FAQs</Link>
        <Link to="/about" className="font-semibold text-muted-foreground hover:text-primary transition-colors">About Us</Link>
        <Link to="/privacy" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Terms of Services</Link>
        <Link to="/blog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Blog</Link>
        <Link to="/changelog" className="font-semibold text-primary underline">Changelog</Link>
        <Link to="/brand" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Brand</Link>
        <Link to="/help" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Help</Link>
      </nav>
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
    </div>
  );
} 