import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Star, Award, Phone } from 'lucide-react';

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

export default function ServicesList() {
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

  // Get services from dentist data or use default services
  const services = dentist?.services_list || [
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Emergency Care',
    'Teeth Cleaning',
    'Dental Implants',
    'Root Canal Treatment',
    'Teeth Whitening'
  ];

  console.log("ServicesList - dentist:", dentist);
  console.log("ServicesList - services_list:", dentist?.services_list);
  console.log("ServicesList - final services:", services);

  const getServiceIcon = (service: string) => {
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
    return serviceIcons[service] || Shield;
  };

  const getServiceDescription = (service: string) => {
    const descriptions: { [key: string]: string } = {
      'General Dentistry': 'Comprehensive dental care including routine check-ups, cleanings, and preventive treatments.',
      'Cosmetic Dentistry': 'Enhance your smile with professional cosmetic treatments and procedures.',
      'Orthodontics': 'Teeth straightening treatments including braces and clear aligners.',
      'Emergency Care': 'Immediate dental care for urgent situations and dental emergencies.',
      'Teeth Cleaning': 'Professional dental cleaning to remove plaque, tartar, and stains.',
      'Dental Implants': 'Permanent tooth replacement solution using titanium implants.',
      'Root Canal Treatment': 'Advanced endodontic treatment to save infected or damaged teeth.',
      'Teeth Whitening': 'Professional whitening treatment to brighten your smile.',
      'Dental Crowns': 'Custom-made caps that cover damaged teeth, restoring their function.',
      'Periodontal Treatment': 'Specialized treatment for gum disease and periodontal conditions.',
      'Emergency Dental Care': 'Immediate care for dental emergencies and urgent situations.'
    };
    return descriptions[service] || `Professional ${service.toLowerCase()} services with modern techniques and equipment.`;
  };

  const buildServiceUrl = (serviceName: string) => {
    const serviceSlug = slugify(serviceName);
    if (!slug) {
      return `/services/${serviceSlug}`;
    }
    return `/${slug}/services/${serviceSlug}`;
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
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {dentist?.business_name ? 
              `Discover the comprehensive range of dental services offered by ${dentist.business_name}.` :
              'Discover our comprehensive range of professional dental services.'
            }
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service);
              return (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="group h-full flex"
                >
                  <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border border-border bg-background">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <IconComponent className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {service}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {getServiceDescription(service)}
                      </p>
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link to={buildServiceUrl(service)}>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🦷</div>
            <h3 className="text-xl font-semibold mb-2">No Services Listed</h3>
            <p className="text-muted-foreground">
              Services information is not currently available for this practice.
            </p>
          </motion.div>
        )}

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
                Ready to Schedule Your Appointment?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our experienced team is ready to help you achieve the smile you've always wanted. Contact us to schedule your appointment today.
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