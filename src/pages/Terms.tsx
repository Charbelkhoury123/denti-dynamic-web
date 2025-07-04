import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex flex-wrap gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
        <Link to="/faqs" className="font-semibold text-muted-foreground hover:text-primary transition-colors">FAQs</Link>
        <Link to="/about" className="font-semibold text-muted-foreground hover:text-primary transition-colors">About Us</Link>
        <Link to="/privacy" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="font-semibold text-primary underline">Terms of Services</Link>
        <Link to="/blog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Blog</Link>
        <Link to="/changelog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
        <Link to="/brand" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Brand</Link>
        <Link to="/help" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Help</Link>
      </nav>
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
    </div>
  );
} 