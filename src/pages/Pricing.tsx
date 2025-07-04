import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Pricing() {
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

  const pricingData = [
    { service: 'Routine Checkup', price: '$75', description: 'Comprehensive oral examination and consultation' },
    { service: 'Teeth Cleaning', price: '$120', description: 'Professional cleaning and plaque removal' },
    { service: 'Dental Filling', price: '$180', description: 'Tooth-colored composite filling' },
    { service: 'Root Canal', price: '$850', description: 'Complete root canal treatment' },
    { service: 'Dental Crown', price: '$1,200', description: 'Porcelain or ceramic crown' },
    { service: 'Teeth Whitening', price: '$450', description: 'Professional in-office whitening' },
    { service: 'Dental Implant', price: '$2,500', description: 'Single tooth implant with crown' },
    { service: 'Orthodontic Consultation', price: '$150', description: 'Initial orthodontic assessment' }
  ];

  return (
    <main className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pricing & Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing for quality dental care. We accept most insurance plans and offer flexible payment options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 mb-12">
            {pricingData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.service}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <span className="text-2xl font-bold text-primary">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Insurance Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Insurance & Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Insurance Accepted</h4>
                    <p className="text-sm text-muted-foreground">
                      We accept most major dental insurance plans
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Payment Plans</h4>
                    <p className="text-sm text-muted-foreground">
                      Flexible financing options available
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">No Insurance?</h4>
                    <p className="text-sm text-muted-foreground">
                      Ask about our membership plan
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Prices may vary based on individual treatment needs. Contact us for a personalized treatment plan and accurate pricing.
                </p>
                <Button asChild>
                  <Link to={slug ? `/${slug}/contact` : '/contact'}>
                    Schedule Consultation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}