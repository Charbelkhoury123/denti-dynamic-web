import React from "react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex gap-4 justify-center">
        <Link to="/features" className="font-semibold text-primary underline">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-center">Our Features</h1>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Advanced Technology</h2>
          <p>State-of-the-art equipment for precise diagnosis and treatment.</p>
        </li>
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Gentle Care</h2>
          <p>Comfortable, pain-free treatments with sedation options available.</p>
        </li>
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Expert Team</h2>
          <p>Highly trained professionals dedicated to your oral health.</p>
        </li>
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Comprehensive Services</h2>
          <p>From routine cleanings to complex procedures, all under one roof.</p>
        </li>
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Personalized Plans</h2>
          <p>Treatment plans tailored to your unique needs and goals.</p>
        </li>
        <li className="bg-card rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">Modern Comforts</h2>
          <p>Relaxing environment with amenities for your comfort.</p>
        </li>
      </ul>
    </div>
  );
} 