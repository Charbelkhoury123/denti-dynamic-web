import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Testimonial } from '@/hooks/useDentistData';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use provided testimonials or fallback to default ones
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      patient_name: 'Sarah Johnson',
      review: 'Dr. Smith and the team provided exceptional care. My smile has never looked better!',
      rating: 5,
      is_featured: true,
      display_order: 1
    },
    {
      id: '2',
      patient_name: 'Michael Chen',
      review: 'Professional, caring, and pain-free experience. Highly recommend this clinic.',
      rating: 5,
      is_featured: true,
      display_order: 2
    },
    {
      id: '3',
      patient_name: 'Emily Davis',
      review: 'The best dental experience I\'ve ever had. The staff is amazing and very gentle.',
      rating: 5,
      is_featured: true,
      display_order: 3
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied patients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              ref={index === 0 ? ref : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-lg p-6 shadow-lg border border-border"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
              <p className="font-semibold">- {testimonial.patient_name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}