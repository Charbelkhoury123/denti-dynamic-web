import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Award, Phone } from 'lucide-react';
import { DentistData } from '@/hooks/useDentistData';

interface ServicesProps {
  dentist: DentistData | null;
}

export function Services({ dentist }: ServicesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const serviceIcons: { [key: string]: any } = {
    'General Dentistry': Shield,
    'Teeth Cleaning': Shield,
    'Dental Fillings': Shield,
    'Root Canal Treatment': Shield,
    'Dental Crowns': Award,
    'Teeth Whitening': Star,
    'Dental Implants': Shield,
    'Orthodontics': Award,
    'Periodontal Treatment': Shield,
    'Emergency Dental Care': Phone,
    'Cosmetic Dentistry': Star,
    'Emergency Care': Phone
  };

  const getServiceIcon = (service: string) => {
    return serviceIcons[service] || Shield;
  };

  const services = dentist?.services_list || [
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Emergency Care'
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive range of dental services to keep your smile healthy and beautiful
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service);
              return (
                <motion.div
                  key={service}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="group h-full flex"
                >
                  <Card className="p-6 h-full min-h-[220px] flex flex-col justify-between text-center hover:shadow-xl transition-shadow border border-border bg-background">
                    <div className="flex flex-col items-center flex-1">
                      <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Professional {service.toLowerCase()} services with modern techniques and equipment for optimal results.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Card className="p-8 bg-dental-gradient text-white shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Consultation?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Our experienced team is ready to help you achieve the smile you've always wanted. Contact us to schedule your appointment today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Schedule Consultation
              </motion.button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}