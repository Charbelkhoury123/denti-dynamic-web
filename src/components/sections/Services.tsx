import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  const serviceIcons: { [key: string]: string } = {
    'General Dentistry': '🦷',
    'Teeth Cleaning': '🧽',
    'Dental Fillings': '⚕️',
    'Root Canal Treatment': '🔧',
    'Dental Crowns': '👑',
    'Teeth Whitening': '✨',
    'Dental Implants': '🔩',
    'Orthodontics': '🦷',
    'Periodontal Treatment': '🩺',
    'Emergency Dental Care': '🚨'
  };

  const getServiceIcon = (service: string) => {
    return serviceIcons[service] || '🦷';
  };

  const services = dentist?.services_list || [
    'General Dentistry',
    'Teeth Cleaning',
    'Dental Fillings',
    'Root Canal Treatment',
    'Dental Crowns',
    'Teeth Whitening'
  ];

  return (
    <section id="services" className="py-12 lg:py-16 bg-background">
      <div className="container-custom">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Comprehensive Dental Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From routine check-ups to advanced procedures, we offer a full range of dental services to keep your smile healthy and beautiful.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch px-4 sm:px-0"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="group h-full flex"
              >
                <Card className="p-4 sm:p-6 h-full min-h-[200px] sm:min-h-[220px] flex flex-col justify-between hover-lift dental-transition border-border/50 hover:border-primary/30 hover:shadow-dental-medium">
                  <div className="flex flex-col items-center text-center flex-1">
                    <motion.div 
                      className="text-4xl mb-4 p-4 bg-dental-blue-light rounded-full group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {getServiceIcon(service)}
                    </motion.div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {service}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Professional {service.toLowerCase()} services with modern techniques and equipment for optimal results.
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Card className="p-8 bg-dental-gradient text-white shadow-dental-strong">
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