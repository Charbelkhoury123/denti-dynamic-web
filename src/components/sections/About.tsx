import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { DentistData } from '@/hooks/useDentistData';

interface AboutProps {
  dentist: DentistData | null;
}

export function About({ dentist }: AboutProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const features = [
    {
      title: "Advanced Technology",
      description: "State-of-the-art equipment for precise diagnosis and treatment",
      icon: "🔬"
    },
    {
      title: "Gentle Care",
      description: "Comfortable, pain-free treatments with sedation options available",
      icon: "🤲"
    },
    {
      title: "Expert Team",
      description: "Highly trained professionals dedicated to your oral health",
      icon: "👨‍⚕️"
    },
    {
      title: "Comprehensive Services",
      description: "From routine cleanings to complex procedures, all under one roof",
      icon: "🏥"
    }
  ];

  return (
    <section id="about" className="section-padding bg-subtle-gradient">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Our Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Committed to providing exceptional dental care with a personal touch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome to {dentist?.business_name || 'Our Practice'}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dentist?.about_text || 
                    'We are dedicated to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced professionals uses the latest technology and techniques to ensure you receive the best possible treatment.'
                  }
                </p>
                <div className="pt-4">
                  <div className="flex items-center space-x-4 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-semibold">Comprehensive dental care</span>
                  </div>
                  <div className="flex items-center space-x-4 text-primary mt-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-semibold">Modern technology & techniques</span>
                  </div>
                  <div className="flex items-center space-x-4 text-primary mt-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-semibold">Personalized patient care</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-8 shadow-dental-medium hover-lift">
                <div className="text-center">
                  <div className="w-20 h-20 bg-dental-gradient rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                    🦷
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    Professional Excellence
                  </h4>
                  <p className="text-muted-foreground">
                    Our commitment to excellence ensures that every patient receives the highest quality dental care in a comfortable, stress-free environment.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover-lift dental-transition">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h5 className="font-bold text-foreground mb-3">{feature.title}</h5>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}