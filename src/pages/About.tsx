import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { slug } = useParams();
  const { dentist, loading } = useDentistData(slug);
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

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About {dentist?.business_name || 'Our Practice'}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Our Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {dentist?.about_text || 
                    'We are dedicated to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced professionals uses the latest technology and techniques to ensure you receive the best possible treatment.'
                  }
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our mission is to help you achieve and maintain a healthy, beautiful smile for life. We believe in personalized care and building long-term relationships with our patients.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-foreground mr-2">📍</span>
                    <span className="text-muted-foreground">{dentist?.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-foreground mr-2">📞</span>
                    <span className="text-muted-foreground">{dentist?.phone}</span>
                  </div>
                  {dentist?.working_hours && (
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-2">Working Hours:</h4>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {dentist.working_hours}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-card rounded-xl shadow p-6 text-center"
            >
              <div className="text-4xl mb-4">🦷</div>
              <h3 className="text-lg font-bold mb-2">Expert Care</h3>
              <p className="text-muted-foreground text-sm">
                Professional dental services with years of experience and expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card rounded-xl shadow p-6 text-center"
            >
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-bold mb-2">Modern Technology</h3>
              <p className="text-muted-foreground text-sm">
                State-of-the-art equipment for precise diagnosis and treatment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-card rounded-xl shadow p-6 text-center"
            >
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-lg font-bold mb-2">Compassionate Care</h3>
              <p className="text-muted-foreground text-sm">
                We prioritize your comfort and well-being throughout your visit.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}