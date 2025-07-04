import React from "react";
import { Link } from "react-router-dom";

export default function Faqs() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex flex-wrap gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
        <Link to="/faqs" className="font-semibold text-primary underline">FAQs</Link>
        <Link to="/about" className="font-semibold text-muted-foreground hover:text-primary transition-colors">About Us</Link>
        <Link to="/privacy" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Terms of Services</Link>
        <Link to="/blog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Blog</Link>
        <Link to="/changelog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
        <Link to="/brand" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Brand</Link>
        <Link to="/help" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Help</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-card rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">What services do you offer?</h2>
          <p>We offer a full range of dental services, including checkups, cleanings, fillings, root canals, whitening, and more.</p>
        </div>
        <div className="bg-card rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">Do you accept insurance?</h2>
          <p>Yes, we accept most major dental insurance plans. Please contact us for details.</p>
        </div>
        <div className="bg-card rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">How do I book an appointment?</h2>
          <p>You can book an appointment by calling our office or using our online booking form.</p>
        </div>
      </div>
    </div>
  );
} 