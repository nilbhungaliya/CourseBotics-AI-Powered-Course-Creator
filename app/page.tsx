"use client";
import { Header } from "./_components/Header";
import Hero from "./_components/Hero";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-20 bg-secondary/50 dark:bg-secondary/20">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
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
                  className="group relative overflow-hidden rounded-xl border bg-background p-5 md:p-6 shadow-sm transition-all hover:shadow-md card-hover"
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
        
        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
            <motion.div 
              className="relative overflow-hidden rounded-xl bg-primary p-6 sm:p-8 md:p-12 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-foreground/20 opacity-90" />
              <div className="relative z-10 flex flex-col items-center text-center text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Ready to Create Your First Course?
                </h2>
                <p className="mt-3 md:mt-4 max-w-2xl text-primary-foreground/90 text-sm sm:text-base md:text-lg">
                  Join thousands of educators who are already using our platform to create engaging and effective courses.
                </p>
                <motion.div 
                  className="mt-6 md:mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/sign-up" className="inline-flex h-10 md:h-12 items-center justify-center rounded-full bg-white px-6 md:px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white">
                    Get Started for Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-between gap-4 py-8 md:h-24 md:flex-row md:py-0 px-4 md:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CourseBotics. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Terms</a>
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Privacy</a>
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
