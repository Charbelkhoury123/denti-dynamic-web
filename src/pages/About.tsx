import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactMarkdown from 'react-markdown';

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
                {dentist?.about_text ? (
                  <div className="prose text-muted-foreground mb-4 leading-relaxed">
                    <ReactMarkdown>
                      {dentist.about_text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    We are dedicated to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced professionals uses the latest technology and techniques to ensure you receive the best possible treatment.
                  </p>
                )}
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
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-3">Working Hours</h4>
                      <div className="space-y-2">
                        {(() => {
                          const parseWorkingHours = (workingHoursString: string) => {
                            if (!workingHoursString) return null;
                            
                            const parsedHours: { [key: string]: string } = {};
                            const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):\s*([^|]+)/gi;
                            let match;
                            
                            while ((match = dayPattern.exec(workingHoursString)) !== null) {
                              const day = match[1];
                              const hours = match[2].trim();
                              const cleanHours = hours
                                .replace(/AM\s*-\s*/g, 'AM - ')
                                .replace(/,\s*/g, ', ')
                                .replace(/\s+/g, ' ')
                                .trim();
                              parsedHours[day] = cleanHours;
                            }
                            
                            return parsedHours;
                          };

                          const formatTimeRange = (timeString: string) => {
                            if (!timeString) return 'Closed';
                            const ranges = timeString.split(',').map(range => range.trim());
                            return ranges.map(range => {
                              return range
                                .replace(/(\d{1,2}):(\d{2})\s*(AM|PM)/g, '$1:$2 $3')
                                .replace(/\s*-\s*/g, ' - ');
                            }).join(', ');
                          };

                          const parsedHours = parseWorkingHours(dentist.working_hours);
                          if (parsedHours) {
                            return Object.entries(parsedHours).map(([day, hours]) => (
                              <div key={day} className="flex justify-between items-center py-1">
                                <span className="font-medium text-foreground">{day}</span>
                                <span className="text-muted-foreground text-sm">
                                  {formatTimeRange(hours)}
                                </span>
                              </div>
                            ));
                          } else {
                            return (
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center py-1">
                                  <span className="font-medium text-foreground">Monday - Friday</span>
                                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="font-medium text-foreground">Saturday</span>
                                  <span className="text-muted-foreground">9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                  <span className="font-medium text-foreground">Sunday</span>
                                  <span className="text-muted-foreground">Emergency Only</span>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>
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