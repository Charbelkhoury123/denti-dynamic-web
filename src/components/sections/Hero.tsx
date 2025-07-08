import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Phone } from 'lucide-react';
import { DentistData } from '@/hooks/useDentistData';
import { AuroraBackground } from './AuroraBackground';
import { SparklesCore } from './Sparkles';

interface HeroProps {
  dentist: DentistData | null;
  onBookAppointment: () => void;
}

export function Hero({ dentist, onBookAppointment }: HeroProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-0">
      <AuroraBackground className="absolute inset-0">
        <div className="absolute inset-0 bg-background/50" />
      </AuroraBackground>
      
      <div className="relative z-10 container mx-auto px-2 sm:px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-4 inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white shadow-md">
            Professional Dental Care
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {dentist?.business_name ? `${dentist.business_name}` : 'Your Perfect Smile'}
            <br />
            <span className="text-black">Starts Here</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-black/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Experience world-class dental care with our team of expert dentists. 
            We provide comprehensive dental services in a comfortable, modern environment.
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full max-w-md mx-auto">
            <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary hover:bg-white/90 rounded-lg shadow" onClick={onBookAppointment}>
              <CalendarIcon className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-lg shadow">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16 pt-8 border-t border-white/20">
            {[
              { number: "5000+", label: "Happy Patients" },
              { number: "15+", label: "Years Experience" },
              { number: "4.9★", label: "Patient Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-600/80 font-medium text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#3b82f6"
          speed={0.5}
        />
      </div>
    </section>
  );
}