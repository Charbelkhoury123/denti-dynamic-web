import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Appointment } from '@/hooks/useDentistData';

interface AppointmentBookingProps {
  onSubmitAppointment: (appointment: Appointment) => Promise<{ success: boolean; error?: any }>;
}

export function AppointmentBooking({ onSubmitAppointment }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const handleConfirmAppointment = async () => {
    if (!selectedTime) return;
    
    const appointmentData: Appointment = {
      name: 'Online Booking',
      phone: 'To be provided',
      email: 'To be provided',
      message: `Appointment request for ${format(selectedDate, "EEEE, MMMM d, yyyy")} at ${selectedTime}`,
      preferred_time: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
    };

    await onSubmitAppointment(appointmentData);
    setSelectedTime(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Book Your Appointment</h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred date and time for your dental visit
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                  Select Date
                </h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setSelectedDate(newDate);
                        setSelectedTime(null);
                      }
                    }}
                    className="border-0"
                    disabled={[{ before: new Date() }]}
                  />
                </div>
              </div>

              {/* Time Slots Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 text-center">
                  Available Times
                </h3>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {timeSlots.map(({ time, available }) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "ghost"}
                      className={`w-full h-12 text-base justify-start transition-all duration-200 ${
                        !available 
                          ? "opacity-50 cursor-not-allowed line-through" 
                          : selectedTime === time 
                            ? "bg-primary text-primary-foreground shadow-md scale-105" 
                            : "hover:bg-accent/60 hover:scale-102"
                      }`}
                      onClick={() => available && setSelectedTime(time)}
                      disabled={!available}
                    >
                      <span className="mr-2">🕐</span>
                      {time}
                      {!available && <span className="ml-auto text-xs">(Booked)</span>}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Confirmation Section */}
            {selectedTime && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 text-center"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  🎯 Appointment Selected
                </h4>
                <p className="text-muted-foreground mb-4">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")} at <span className="font-semibold text-primary">{selectedTime}</span>
                </p>
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={handleConfirmAppointment}
                >
                  ✅ Confirm Appointment
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}