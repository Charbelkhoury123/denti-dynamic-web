import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Award, Shield, Users, Clock } from 'lucide-react';
import { DentistData } from '@/hooks/useDentistData';

interface AboutProps {
  dentist: DentistData | null;
  className?: string;
}

export function About({ dentist, className }: AboutProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose {dentist?.business_name || 'Our Practice'}?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {dentist?.about_text || 
                'With over 15 years of experience, our team of certified dentists provides exceptional care using the latest technology and techniques.'
              }
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-primary" />
                <span>Board-certified dentists</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <span>State-of-the-art equipment</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-primary" />
                <span>Personalized treatment plans</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary" />
                <span>Flexible scheduling</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-muted/30 rounded-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-4">Office Hours</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </div>
            </div>
            
            {dentist?.working_hours && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-2">Working Hours:</h4>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {dentist.working_hours}
                </pre>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold mb-2">Emergency Contact</h4>
              <p className="text-muted-foreground">
                {dentist?.phone ? `24/7 Emergency Line: ${dentist.phone}` : '24/7 Emergency Line: (555) 123-4567'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}