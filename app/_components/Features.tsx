"use client";

import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="relative py-12 md:py-16">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <motion.h2 
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to create amazing courses
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI-Powered Content",
              description: "Generate comprehensive course outlines and content with just a few clicks using advanced AI technology."
            },
            {
              title: "Video Integration",
              description: "Automatically find and suggest relevant YouTube videos for each chapter of your course."
            },
            {
              title: "Customizable Templates",
              description: "Choose from a variety of templates to create courses that match your teaching style."
            },
            {
              title: "Interactive Learning",
              description: "Engage your students with interactive elements and assessments throughout your courses."
            },
            {
              title: "Progress Tracking",
              description: "Monitor student progress and engagement with detailed analytics and reports."
            },
            {
              title: "Share & Monetize",
              description: "Easily share your courses with others or monetize your content through various channels."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm p-5 md:p-6 shadow-sm transition-all hover:shadow-md card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0 h-16 w-16 md:h-20 md:w-20 bg-primary/10 rounded-bl-full" />
              <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 