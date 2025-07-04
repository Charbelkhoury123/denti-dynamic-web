import React from "react";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <div className="container-custom py-16">
      <nav className="mb-8 flex gap-4 justify-center">
        <Link to="/features" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        <Link to="/testimonials" className="font-semibold text-primary underline">Testimonials</Link>
      </nav>
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
    </div>
  );
} 