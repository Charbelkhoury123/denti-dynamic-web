import React from "react";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Blog() {
  const { slug } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      id: 1,
      title: "5 Tips for a Healthier Smile",
      date: "April 10, 2024",
      excerpt: "Discover simple daily habits that can make a big difference in your oral health.",
      content: "Maintaining good oral health doesn't have to be complicated. Here are five simple tips that can help you achieve and maintain a healthier smile..."
    },
    {
      id: 2,
      title: "Understanding Dental Implants",
      date: "March 28, 2024",
      excerpt: "Learn about the benefits and process of dental implants for missing teeth.",
      content: "Dental implants are a revolutionary solution for replacing missing teeth. Unlike traditional dentures or bridges, implants provide a permanent solution..."
    },
    {
      id: 3,
      title: "The Importance of Regular Dental Checkups",
      date: "March 15, 2024",
      excerpt: "Why regular dental visits are crucial for maintaining optimal oral health.",
      content: "Regular dental checkups are more than just cleanings. They're your first line of defense against serious dental problems..."
    },
    {
      id: 4,
      title: "Teeth Whitening: What You Need to Know",
      date: "February 28, 2024",
      excerpt: "Everything about professional teeth whitening and maintaining your bright smile.",
      content: "A bright, white smile can boost your confidence and make a great first impression. Learn about the different whitening options available..."
    }
  ];

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
            Dental Health Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest tips, insights, and news about dental health and oral care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary font-medium">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <button className="text-primary hover:text-primary-hover font-medium transition-colors">
                    Read More →
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest dental health tips and practice updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}