import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex flex-wrap gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
        <Link to="/faqs" className="font-semibold text-muted-foreground hover:text-primary transition-colors">FAQs</Link>
        <Link to="/about" className="font-semibold text-muted-foreground hover:text-primary transition-colors">About Us</Link>
        <Link to="/privacy" className="font-semibold text-primary underline">Privacy Policy</Link>
        <Link to="/terms" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Terms of Services</Link>
        <Link to="/blog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Blog</Link>
        <Link to="/changelog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
        <Link to="/brand" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Brand</Link>
        <Link to="/help" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Help</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow p-6">
        <p className="mb-4">We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>We only collect information necessary for your care and our services.</li>
          <li>Your data is never sold or shared with third parties without your consent.</li>
          <li>We use secure systems to store and process your information.</li>
        </ul>
        <p>If you have any questions about our privacy practices, please contact us.</p>
      </div>
    </div>
  );
} 