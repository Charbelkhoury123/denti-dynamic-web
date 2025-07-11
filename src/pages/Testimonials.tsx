import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Testimonials() {
  const { slug } = useParams();
  const { dentist, testimonials, loading } = useDentistData(slug);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Use testimonials from database if available, otherwise use default ones
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      patient_name: 'Jad El Hage',
      review: 'I had a wonderful experience at the clinic. The staff was very professional and made me feel at ease throughout my treatment.',
      rating: 5,
      is_featured: true,
      display_order: 1
    },
    {
      id: '2',
      patient_name: 'Maya Khoury',
      review: 'The dentist explained everything clearly and the results were amazing. Highly recommended for anyone looking for quality dental care in Lebanon.',
      rating: 5,
      is_featured: true,
      display_order: 2
    },
    {
      id: '3',
      patient_name: 'Rami Chidiac',
      review: 'Very friendly team and modern clinic. I am very happy with my new smile. Thank you for the excellent service!',
      rating: 5,
      is_featured: true,
      display_order: 3
    },
    {
      id: '4',
      patient_name: 'Layal Fares',
      review: 'The clinic is spotless and the staff is so welcoming. I felt comfortable from the moment I walked in.',
      rating: 5,
      is_featured: true,
      display_order: 4
    },
    {
      id: '5',
      patient_name: 'Karim Abou Jaoude',
      review: 'Excellent dental care and attention to detail. I will definitely recommend this clinic to my friends and family.',
      rating: 5,
      is_featured: true,
      display_order: 5
    },
    {
      id: '6',
      patient_name: 'Nour Matar',
      review: 'Professional and caring team. My dental anxiety is gone thanks to their gentle approach.',
      rating: 4,
      is_featured: true,
      display_order: 6
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Patient Testimonials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Read what our patients have to say about their experience with our dental care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating || 5)}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 flex-1 italic">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-semibold">
                        {testimonial.patient_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.patient_name}
                      </p>
                      {testimonial.is_featured && (
                        <span className="text-xs text-primary font-medium">
                          Verified Patient
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join Our Happy Patients?
              </h3>
              <p className="text-muted-foreground mb-6">
                Experience the same quality care that our patients rave about. Schedule your appointment today.
              </p>
              <Button asChild size="lg">
                <Link to={slug ? `/${slug}/contact` : '/contact'}>
                  Book Your Appointment
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}