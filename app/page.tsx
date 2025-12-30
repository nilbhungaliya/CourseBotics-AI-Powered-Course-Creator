"use client";
import { Navbar } from "./_components/Navbar";
import Hero from "./_components/Hero";
import { motion, AnimatePresence } from "framer-motion";
import Features from "./_components/Features";
import Stats from "./_components/Stats";
import HowItWorks from "./_components/HowItWorks";
import Testimonials from "./_components/Testimonials";
import TechStack from "./_components/TechStack";
import Partners from "./_components/Partners";
import Newsletter from "./_components/Newsletter";
import Pricing from "./_components/Pricing";
import FAQ from "./_components/FAQ";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";
import { PageLoader } from "@/components/ui/page-loader";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { LazySection } from "@/components/ui/lazy-section";
import { ScrollPerformanceOptimizer } from "@/components/ui/scroll-performance";
import { useContentPreloader } from "@/hooks/use-content-preloader";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useState, useEffect, useMemo } from "react";

// Smooth spring transition config
const smoothTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 30,
  mass: 1,
};

// Smooth easing for CSS-like animations
const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export default function Home() {
  const [contentReady, setContentReady] = useState(false);
  const { isLoading } = useContentPreloader({
    dependencies: [contentReady],
    minLoadingTime: 1500,
  });

  // Initialize smooth scrolling
  useSmoothScroll({
    duration: 1000,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    offset: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Memoize background elements to prevent re-renders
  const backgroundElements = useMemo(() => (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      {/* Subtle animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-50"
      />

      {/* Static floating orbs - no animation to prevent flicker */}
      {[0, 1, 2].map((i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full bg-primary/5 blur-3xl"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
          }}
        />
      ))}

      {/* Simple grid lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    </div>
  ), []);

  return (
    <>
      <ScrollPerformanceOptimizer />
      <PageLoader isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.main
            className="relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
          >
            <SmoothScroll />
            
            {backgroundElements}

            {/* Main content */}
            <div className="relative">
              <Navbar />

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: smoothEase,
                  delay: 0.1,
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <Hero />
              </motion.div>

              <LazySection delay={0.05} threshold={0.1}>
                <Partners />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Stats />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Features />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <HowItWorks />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <TechStack />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Testimonials />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Pricing />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <FAQ />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Newsletter />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <CTA />
              </LazySection>

              <LazySection delay={0.05} threshold={0.1}>
                <Footer />
              </LazySection>
            </div>

            <ScrollToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}