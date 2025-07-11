import { useParams } from 'react-router-dom';
import { useDentistData } from '@/hooks/useDentistData';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

function extractLatLngFromUrl(url: string): { lat: string, lng: string } | null {
  const match = url.match(/!3d([0-9.-]+)!4d([0-9.-]+)/);
  if (match) {
    return { lat: match[1], lng: match[2] };
  }
  return null;
}

function extractLatLngFromUrl(url: string): { lat: string, lng: string } | null {
  const match = url.match(/!3d([0-9.-]+)!4d([0-9.-]+)/);
  if (match) {
    return { lat: match[1], lng: match[2] };
  }
  return null;
}

const Contact = () => {
  const { slug } = useParams();
  const { dentist, loading, submitAppointment } = useDentistData(slug);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '',
    preferred_time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitAppointment(form);
      if (result.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', message: '', preferred_time: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (!dentist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Clinic not found</h1>
          <p className="text-muted-foreground">The requested dental clinic could not be found.</p>
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
          Contact {dentist.business_name}
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <h3 className="font-medium text-foreground">Address</h3>
                      <p className="text-muted-foreground">{dentist.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-medium text-foreground">Phone</h3>
                      <a 
                        href={`tel:${dentist.phone}`}
                        className="text-primary hover:text-primary-hover transition-colors"
                      >
                        {dentist.phone}
                      </a>
                    </div>
                  </div>

                  {dentist.place_url && (
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🗺️</span>
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
                </div>

                {dentist?.working_hours ? (
                  <div className="pt-4 border-t border-border">
                    <Accordion type="single" collapsible defaultValue="working-hours">
                      <AccordionItem value="working-hours">
                        <AccordionTrigger className="font-medium text-foreground mb-3 px-0 py-2 text-left w-full">
                          Working Hours
                        </AccordionTrigger>
                        <AccordionContent>
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
                                  <div key={day} className="flex justify-between text-sm py-1">
                                    <span className="text-foreground font-medium">{day}:</span>
                                    <span className="text-muted-foreground">
                                      {formatTimeRange(hours)}
                                    </span>
                                  </div>
                                ));
                              } else {
                                return (
                                  <div className="text-sm text-muted-foreground space-y-1">
                                    <div className="flex justify-between py-1">
                                      <span className="font-medium text-foreground">Mon - Fri:</span>
                                      <span>8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="font-medium text-foreground">Saturday:</span>
                                      <span>9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                      <span className="font-medium text-foreground">Sunday:</span>
                                      <span>Emergency Only</span>
                                    </div>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <Accordion type="single" collapsible defaultValue="working-hours">
                      <AccordionItem value="working-hours">
                        <AccordionTrigger className="font-medium text-foreground mb-3 px-0 py-2 text-left w-full">
                          Working Hours
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-1">
                              <span className="font-medium text-foreground">Mon - Fri:</span>
                              <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="font-medium text-foreground">Saturday:</span>
                              <span className="text-muted-foreground">9:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="font-medium text-foreground">Sunday:</span>
                              <span className="text-muted-foreground">Emergency Only</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Static Google Maps image, clickable */}
            <div className="w-full">
              {(() => {
                const latLng = dentist.place_url ? extractLatLngFromUrl(dentist.place_url) : null;
                const mapsUrl = dentist.place_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dentist.address)}`;
                const staticMapUrl = latLng
                  ? `https://maps.googleapis.com/maps/api/staticmap?center=${latLng.lat},${latLng.lng}&zoom=16&size=600x300&markers=color:red%7C${latLng.lat},${latLng.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
                  : `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(dentist.address)}&zoom=16&size=600x300&markers=color:red%7C${encodeURIComponent(dentist.address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
                return (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Google Maps to clinic location"
                    className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={staticMapUrl}
                      alt="Clinic location on map"
                      className="w-full h-60 object-cover"
                      onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                    />
                    <div className="text-center text-xs text-muted-foreground mt-1">Tap to open in Google Maps</div>
                  </a>
                );
              })()}
            </div>
          </motion.div>

          {/* Book Appointment + Google Maps Iframe in right column */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card>
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
                        className="mt-4"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Phone *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                          Preferred Time
                        </label>
                        <Input
                          type="text"
                          name="preferred_time"
                          value={form.preferred_time}
                          onChange={handleChange}
                          placeholder="e.g., Monday morning, weekday afternoons"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="Please describe your dental needs or any questions you have..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Static Google Maps image, clickable */}
              <div className="w-full">
                {(() => {
                  const latLng = dentist.place_url ? extractLatLngFromUrl(dentist.place_url) : null;
                  const mapsUrl = dentist.place_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dentist.address)}`;
                  const staticMapUrl = latLng
                    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latLng.lat},${latLng.lng}&zoom=16&size=600x300&markers=color:red%7C${latLng.lat},${latLng.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
                    : `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(dentist.address)}&zoom=16&size=600x300&markers=color:red%7C${encodeURIComponent(dentist.address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
                  return (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Google Maps to clinic location"
                      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={staticMapUrl}
                        alt="Clinic location on map"
                        className="w-full h-60 object-cover"
                        onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                      />
                      <div className="text-center text-xs text-muted-foreground mt-1">Tap to open in Google Maps</div>
                    </a>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Contact;