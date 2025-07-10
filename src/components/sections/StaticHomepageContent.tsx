import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Shield, 
  Award, 
  Users,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/sections/AuroraBackground";
import { SparklesCore } from "@/components/sections/Sparkles";
import { DentistData, Testimonial, Appointment } from '@/hooks/useDentistData';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ReactMarkdown from 'react-markdown';

// Helper function to parse working hours string into structured data
const parseWorkingHours = (workingHoursString: string) => {
  if (!workingHoursString) return null;
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const parsedHours: { [key: string]: string } = {};
  
  // Split by day patterns and extract hours
  const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):\s*([^|]+)/gi;
  let match;
  
  while ((match = dayPattern.exec(workingHoursString)) !== null) {
    const day = match[1];
    const hours = match[2].trim();
    
    // Clean up the hours format
    const cleanHours = hours
      .replace(/AM\s*-\s*/g, 'AM - ')
      .replace(/,\s*/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
    
    parsedHours[day] = cleanHours;
  }
  
  return parsedHours;
};

// Helper function to format time ranges nicely
const formatTimeRange = (timeString: string) => {
  if (!timeString) return 'Closed';
  
  // Handle multiple time ranges (e.g., "12:00 AM - 7:00 AM, 8:30 AM - 12:00 AM")
  const ranges = timeString.split(',').map(range => range.trim());
  
  return ranges.map(range => {
    // Clean up the format
    return range
      .replace(/(\d{1,2}):(\d{2})\s*(AM|PM)/g, '$1:$2 $3')
      .replace(/\s*-\s*/g, ' - ');
  }).join(', ');
};
interface StaticHomepageContentProps {
  dentist: DentistData | null;
  testimonials: Testimonial[];
  submitAppointment: (appointment: Appointment) => Promise<{ success: boolean; error?: any }>;
  onBookAppointment: () => void;
}

const StaticHomepageContent = ({ 
  dentist, 
  testimonials, 
  submitAppointment, 
  onBookAppointment 
}: StaticHomepageContentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [workingHoursExpanded, setWorkingHoursExpanded] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferred_time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: false },
  ];

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

  const services = dentist?.services_list || [
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Emergency Care'
  ];

  // Debug log to check services in homepage
  console.log("StaticHomepageContent - dentist:", dentist);
  console.log("StaticHomepageContent - services_list:", dentist?.services_list);
  console.log("StaticHomepageContent - final services:", services);

  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      patient_name: 'Sarah Johnson',
      review: 'Dr. Smith and the team provided exceptional care. My smile has never looked better!',
      rating: 5,
      is_featured: true,
      display_order: 1
    },
    {
      id: '2',
      patient_name: 'Michael Chen',
      review: 'Professional, caring, and pain-free experience. Highly recommend this clinic.',
      rating: 5,
      is_featured: true,
      display_order: 2
    },
    {
      id: '3',
      patient_name: 'Emily Davis',
      review: 'The best dental experience I\'ve ever had. The staff is amazing and very gentle.',
      rating: 5,
      is_featured: true,
      display_order: 3
    },
  ];

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitAppointment(contactForm);
      if (result.success) {
        setSubmitted(true);
        setContactForm({ name: '', email: '', phone: '', message: '', preferred_time: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmAppointment = async () => {
    if (!selectedTime) return;
    
    const appointmentData: Appointment = {
      name: 'Online Booking',
      phone: 'To be provided',
      email: 'To be provided',
      message: `Appointment request for ${format(selectedDate, "EEEE, MMMM d, yyyy")} at ${selectedTime}`,
      preferred_time: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
    };

    await submitAppointment(appointmentData);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen bg-background px-2 sm:px-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-0">
        <AuroraBackground className="absolute inset-0">
          <div className="absolute inset-0 bg-background/50" />
        </AuroraBackground>
        
        <div className="relative z-10 container mx-auto px-2 sm:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full shadow-md">
              Professional Dental Care
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {dentist?.business_name ? `${dentist.business_name}` : 'Your Perfect Smile'}
              <br />
              <span className="text-foreground font-bold drop-shadow-lg">Starts Here</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Experience world-class dental care with our team of expert dentists. 
              We provide comprehensive dental services in a comfortable, modern environment.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full max-w-md mx-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3" onClick={onBookAppointment}>
                <CalendarIcon className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16 pt-8 border-t border-border/20">
              {[
                { number: "5000+", label: "Happy Patients" },
                { number: "15+", label: "Years Experience" },
                { number: "4.9★", label: "Patient Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary/80 font-medium text-sm sm:text-base">
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

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    className="group h-full flex"
                  >
                    <Card className="p-6 h-full min-h-[220px] flex flex-col justify-between text-center hover:shadow-xl transition-shadow border border-border bg-background rounded-lg shadow-md">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mt-16"
            >
              <Card className="p-8 bg-primary text-primary-foreground shadow-lg rounded-lg shadow-md">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Need a Consultation?
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  Our experienced team is ready to help you achieve the smile you've always wanted. Contact us to schedule your appointment today.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors w-full sm:w-auto"
                >
                  Schedule Consultation
                </motion.button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose {dentist?.business_name || 'Our Practice'}?
              </h2>
              {dentist?.about_text ? (
                <div className="prose text-muted-foreground mb-6">
                  <ReactMarkdown>
                    {dentist.about_text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-lg text-muted-foreground mb-6">
                  With over 15 years of experience, our team of certified dentists provides exceptional care using the latest technology and techniques.
                </p>
              )}
              
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
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 rounded-lg p-8"
            >
              <Accordion type="single" collapsible defaultValue="working-hours">
                <AccordionItem value="working-hours">
                  <AccordionTrigger className="text-2xl font-semibold px-0 py-2 text-left w-full">
                    Office Hours
                  </AccordionTrigger>
                  <AccordionContent>
                    {(dentist?.working_hours ? (
                      <div className="space-y-3 pt-2">
                        {(() => {
                          const parsedHours = parseWorkingHours(dentist.working_hours);
                          if (parsedHours) {
                            return Object.entries(parsedHours).map(([day, hours]) => (
                              <div key={day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                                <span className="font-medium text-foreground">{day}</span>
                                <span className="text-muted-foreground text-sm">
                                  {formatTimeRange(hours)}
                                </span>
                              </div>
                            ));
                          } else {
                            // Fallback to default hours if parsing fails
                            return (
                              <>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                  <span className="font-medium text-foreground">Monday - Friday</span>
                                  <span className="text-muted-foreground text-sm">8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                  <span className="font-medium text-foreground">Saturday</span>
                                  <span className="text-muted-foreground text-sm">9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                  <span className="font-medium text-foreground">Sunday</span>
                                  <span className="text-muted-foreground text-sm">Emergency Only</span>
                                </div>
                              </>
                            );
                          }
                        })()}
                      </div>
                    ) : (
                      // Default hours when no working_hours data is available
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="font-medium text-foreground">Monday - Friday</span>
                          <span className="text-muted-foreground text-sm">8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="font-medium text-foreground">Saturday</span>
                          <span className="text-muted-foreground text-sm">9:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-foreground">Sunday</span>
                          <span className="text-muted-foreground text-sm">Emergency Only</span>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-lg p-6 shadow-lg border border-border"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
                <p className="font-semibold">- {testimonial.patient_name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Contact {dentist?.business_name || 'Our Practice'}
            </h1>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="h-fit rounded-lg shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="text-2xl text-primary mt-1" />
                        <div>
                          <h3 className="font-medium text-foreground">Address</h3>
                          <p className="text-muted-foreground">{dentist?.address || '123 Main Street, City, State 12345'}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="text-2xl text-primary mt-1" />
                        <div>
                          <h3 className="font-medium text-foreground">Phone</h3>
                          <a 
                            href={`tel:${dentist?.phone || '(555) 123-4567'}`}
                            className="text-primary hover:text-primary-hover transition-colors"
                          >
                            {dentist?.phone || '(555) 123-4567'}
                          </a>
                        </div>
                      </div>

                      {dentist?.place_url && (
                        <div className="flex items-start space-x-3">
                          <MapPin className="text-2xl text-primary mt-1" />
                          <div>
                            <h3 className="font-medium text-foreground">Location</h3>
                            <a 
                              href={dentist.place_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary hover:text-primary-hover transition-colors"
                            >
                              View on Google Maps
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        <Clock className="text-2xl text-primary mt-1" />
                        <div className="flex-1">
                          <Accordion type="single" collapsible defaultValue="working-hours">
                            <AccordionItem value="working-hours">
                              <AccordionTrigger className="font-medium text-foreground mb-3 px-0 py-2 text-left w-full">
                                Working Hours
                              </AccordionTrigger>
                              <AccordionContent>
                                {dentist?.working_hours ? (
                                  <div className="space-y-2">
                                    {(() => {
                                      const parsedHours = parseWorkingHours(dentist.working_hours);
                                      if (parsedHours) {
                                        return Object.entries(parsedHours).map(([day, hours]) => (
                                          <div key={day} className="flex justify-between text-sm">
                                            <span className="text-foreground font-medium">{day}:</span>
                                            <span className="text-muted-foreground">
                                              {formatTimeRange(hours)}
                                            </span>
                                          </div>
                                        ));
                                      } else {
                                        return (
                                          <div className="text-sm text-muted-foreground">
                                            <div className="flex justify-between">
                                              <span>Mon - Fri:</span>
                                              <span>8:00 AM - 6:00 PM</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Saturday:</span>
                                              <span>9:00 AM - 4:00 PM</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Sunday:</span>
                                              <span>Emergency Only</span>
                                            </div>
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex justify-between">
                                      <span>Mon - Fri:</span>
                                      <span>8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Saturday:</span>
                                      <span>9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Sunday:</span>
                                      <span>Emergency Only</span>
                                    </div>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card className="rounded-lg shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Book an Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">
                          Thank you for contacting us!
                        </h3>
                        <p className="text-muted-foreground">
                          We'll get back to you soon to confirm your appointment.
                        </p>
                        <Button 
                          onClick={() => setSubmitted(false)}
                          variant="outline"
                          className="mt-4 rounded-md shadow-sm"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactFormSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                              Name *
                            </Label>
                            <Input
                              type="text"
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactFormChange}
                              required
                              placeholder="Your full name"
                              className="w-full rounded-md shadow-sm"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                              Phone *
                            </Label>
                            <Input
                              type="tel"
                              name="phone"
                              value={contactForm.phone}
                              onChange={handleContactFormChange}
                              required
                              placeholder="Your phone number"
                              className="w-full rounded-md shadow-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactFormChange}
                            placeholder="your.email@example.com"
                            className="w-full rounded-md shadow-sm"
                          />
                        </div>

                        <div>
                          <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Preferred Time
                          </Label>
                          <Input
                            type="text"
                            name="preferred_time"
                            value={contactForm.preferred_time}
                            onChange={handleContactFormChange}
                            placeholder="e.g., Monday morning, weekday afternoons"
                            className="w-full rounded-md shadow-sm"
                          />
                        </div>

                        <div>
                          <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Message *
                          </Label>
                          <Textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactFormChange}
                            required
                            rows={4}
                            placeholder="Please describe your dental needs or any questions you have..."
                            className="w-full rounded-md shadow-sm"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full rounded-md shadow-sm"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    {/* Footer */}
    </div>
  );
};

export default StaticHomepageContent;