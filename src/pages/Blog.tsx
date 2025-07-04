import React from "react";
import { Link } from "react-router-dom";

export default function Blog() {
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
        <Link to="/blog" className="font-semibold text-primary underline">Blog</Link>
        <Link to="/changelog" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Changelog</Link>
        <Link to="/brand" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Brand</Link>
        <Link to="/help" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Help</Link>
      </nav>
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
    </div>
  );
} 