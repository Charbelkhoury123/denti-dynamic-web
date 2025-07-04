import React from "react";
import { useParams } from "react-router-dom";
import { useDentistData } from '@/hooks/useDentistData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Faqs() {
  const { slug } = useParams();
  const { dentist, faqs, loading } = useDentistData(slug);
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

  // Use FAQs from database if available, otherwise use default ones
  const displayFaqs = faqs && faqs.length > 0 ? faqs : [
    {
      id: '1',
      question: 'What services do you offer?',
      answer: 'We offer a full range of dental services, including checkups, cleanings, fillings, root canals, whitening, and more.',
      display_order: 1,
      is_active: true
    },
    {
      id: '2',
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major dental insurance plans. Please contact us for details.',
      display_order: 2,
      is_active: true
    },
    {
      id: '3',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by calling our office or using our online booking form.',
      display_order: 3,
      is_active: true
    },
    {
      id: '4',
      question: 'What should I expect during my first visit?',
      answer: 'Your first visit will include a comprehensive examination, digital X-rays if needed, and a thorough cleaning. We will discuss your oral health goals and create a personalized treatment plan.',
      display_order: 4,
      is_active: true
    },
    {
      id: '5',
      question: 'Do you offer emergency dental services?',
      answer: 'Yes, we provide emergency dental care for urgent situations. Please call our office immediately if you experience severe pain, trauma, or other dental emergencies.',
      display_order: 5,
      is_active: true
    }
  ];

  return (
    <main className="container mx-auto px-4 py-16 min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our dental services and practice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {displayFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <AccordionItem 
                  value={`item-${faq.id}`}
                  className="bg-card rounded-xl shadow border px-6 py-2"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question ?? ''}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer ?? ''}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our friendly team is here to help. Contact us for personalized answers to your dental health questions.
              </p>
              <motion.a
                href={slug ? `/${slug}/contact` : '/contact'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors"
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}