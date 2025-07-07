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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Appointment</h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred date and time for your dental visit
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg border border-border bg-background shadow-lg">
              <div className="flex max-lg:flex-col">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(newDate) => {
                    if (newDate) {
                      setSelectedDate(newDate);
                      setSelectedTime(null);
                    }
                  }}
                  className="p-4 lg:pe-8"
                  disabled={[{ before: new Date() }]}
                />
                
                <div className="relative w-full lg:w-80">
                  <div className="border-border py-6 lg:border-l">
                    <div className="px-6">
                      <h3 className="font-semibold mb-4">
                        Available Times - {format(selectedDate, "EEEE, MMM d")}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map(({ time, available }) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedTime(time)}
                            disabled={!available}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      
                      {selectedTime && (
                        <div className="mt-6 p-4 bg-muted rounded-lg">
                          <p className="text-sm font-medium">Selected Appointment:</p>
                          <p className="text-sm text-muted-foreground">
                            {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                          </p>
                          <Button className="w-full mt-3" onClick={handleConfirmAppointment}>
                            Confirm Appointment
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}