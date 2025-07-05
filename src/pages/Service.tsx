import { useParams } from 'react-router-dom';
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function slugToTitle(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Service = () => {
  const { slug: clinicSlug, serviceSlug } = useParams<{ slug: string; serviceSlug: string }>();
  const { dentist, loading } = useDentistData(clinicSlug);
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

  if (!serviceSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <p className="text-muted-foreground">The requested service could not be found.</p>
        </div>
      </div>
    );
  }

  const serviceName = slugToTitle(serviceSlug);
  
  // Service descriptions mapping
  const serviceDescriptions: { [key: string]: { description: string; benefits: string[]; process: string[] } } = {
    'General Dentistry': {
      description: 'Comprehensive dental care including routine check-ups, cleanings, and preventive treatments to maintain optimal oral health.',
      benefits: ['Preventive care', 'Early problem detection', 'Comprehensive oral health assessment', 'Professional cleaning'],
      process: ['Initial consultation', 'Comprehensive examination', 'Digital X-rays if needed', 'Professional cleaning', 'Treatment planning']
    },
    'Teeth Cleaning': {
      description: 'Professional dental cleaning to remove plaque, tartar, and stains, keeping your teeth and gums healthy.',
      benefits: ['Removes plaque and tartar', 'Prevents gum disease', 'Freshens breath', 'Brightens smile'],
      process: ['Oral examination', 'Plaque and tartar removal', 'Professional polishing', 'Fluoride treatment', 'Oral hygiene education']
    },
    'Dental Fillings': {
      description: 'Tooth-colored composite fillings to restore teeth damaged by decay, maintaining natural appearance.',
      benefits: ['Restores tooth function', 'Natural appearance', 'Durable materials', 'Prevents further decay'],
      process: ['Numbing the area', 'Removing decay', 'Cleaning the cavity', 'Placing the filling', 'Shaping and polishing']
    },
    'Root Canal Treatment': {
      description: 'Advanced endodontic treatment to save infected or severely damaged teeth by removing infected pulp.',
      benefits: ['Saves natural tooth', 'Eliminates pain', 'Prevents infection spread', 'Restores function'],
      process: ['Local anesthesia', 'Access hole creation', 'Pulp removal', 'Canal cleaning', 'Sealing and restoration']
    },
    'Dental Crowns': {
      description: 'Custom-made caps that cover damaged teeth, restoring their shape, size, strength, and appearance.',
      benefits: ['Protects weak teeth', 'Restores shape and size', 'Improves appearance', 'Long-lasting solution'],
      process: ['Tooth preparation', 'Impression taking', 'Temporary crown placement', 'Crown fabrication', 'Final crown placement']
    },
    'Teeth Whitening': {
      description: 'Professional whitening treatment to brighten your smile and remove stains from coffee, wine, and aging.',
      benefits: ['Brighter smile', 'Removes stains', 'Boosts confidence', 'Safe and effective'],
      process: ['Consultation', 'Shade assessment', 'Protective gel application', 'Whitening treatment', 'Results evaluation']
    },
    'Dental Implants': {
      description: 'Permanent tooth replacement solution using titanium implants that integrate with your jawbone.',
      benefits: ['Permanent solution', 'Natural feel', 'Preserves jawbone', 'No impact on adjacent teeth'],
      process: ['Consultation and planning', 'Implant placement', 'Healing period', 'Abutment placement', 'Crown attachment']
    },
    'Orthodontics': {
      description: 'Teeth straightening treatments including braces and clear aligners to correct misaligned teeth.',
      benefits: ['Straighter teeth', 'Improved bite', 'Better oral health', 'Enhanced confidence'],
      process: ['Initial consultation', 'Treatment planning', 'Appliance fitting', 'Regular adjustments', 'Retention phase']
    },
    'Periodontal Treatment': {
      description: 'Specialized treatment for gum disease, including deep cleaning and advanced therapies.',
      benefits: ['Treats gum disease', 'Prevents tooth loss', 'Reduces inflammation', 'Improves oral health'],
      process: ['Periodontal examination', 'Deep cleaning', 'Medication if needed', 'Follow-up care', 'Maintenance therapy']
    },
    'Emergency Dental Care': {
      description: 'Immediate dental care for urgent situations including severe pain, trauma, and dental emergencies.',
      benefits: ['Immediate relief', 'Prevents complications', 'Available when needed', 'Comprehensive emergency care'],
      process: ['Emergency assessment', 'Pain management', 'Immediate treatment', 'Follow-up planning', 'Preventive advice']
    }
  };

  const serviceInfo = serviceDescriptions[serviceName] || {
    description: `Professional ${serviceName.toLowerCase()} services provided with the latest techniques and technology.`,
    benefits: ['Professional care', 'Modern techniques', 'Experienced team', 'Quality results'],
    process: ['Consultation', 'Assessment', 'Treatment planning', 'Procedure', 'Follow-up care']
  };

  const contactUrl = clinicSlug ? `/${clinicSlug}/contact` : '/contact';

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {serviceName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {serviceInfo.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <span className="text-2xl mr-3">✨</span>
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {serviceInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Treatment Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {serviceInfo.process.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Schedule Your {serviceName}?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact us today to book your appointment and take the first step towards better oral health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to={contactUrl}>
                    Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to={clinicSlug ? `/${clinicSlug}` : '/'}>
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Service;