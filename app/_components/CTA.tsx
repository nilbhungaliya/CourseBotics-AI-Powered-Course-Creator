"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center">
              <motion.h2 
                className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Create Your First Course?
              </motion.h2>
              <motion.p 
                className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of educators who are already using our platform to create engaging and effective courses.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/sign-up">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-medium border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 