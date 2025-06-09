"use client";
import { Header } from "./_components/Header";
import Hero from "./_components/Hero";
import { motion, AnimatePresence } from "framer-motion";
import Features from "./_components/Features";
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
import { useState, useEffect } from "react";

export default function Home() {
  const [contentReady, setContentReady] = useState(false);
  const { isLoading } = useContentPreloader({
    dependencies: [contentReady],
    minLoadingTime: 2000,
  });

  // Initialize smooth scrolling
  useSmoothScroll({
    duration: 1200,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    offset: 0,
  });

  useEffect(() => {
    // Simulate content loading (images, data, etc.)
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollPerformanceOptimizer />
      <PageLoader isLoading={isLoading} />

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            className="relative min-h-screen w-full max-w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ overflowX: "hidden" }}
          >
            <SmoothScroll />
            {/* Background effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

              {/* Animated mesh grid */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                    style={{
                      top: `${i * 5}%`,
                      left: "0",
                      right: "0",
                      transform: `translateX(${Math.sin(i) * 20}px)`,
                    }}
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                      scaleX: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Floating tech elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`tech-${i}`}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.random() * 10 - 5, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  >
                    <div className="relative">
                      {/* Tech symbol */}
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm" />
                      {/* Connection lines */}
                      <div className="absolute inset-0">
                        {[...Array(4)].map((_, j) => (
                          <motion.div
                            key={`line-${j}`}
                            className="absolute w-12 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"
                            style={{
                              transform: `rotate(${j * 90}deg)`,
                              transformOrigin: "left center",
                            }}
                            animate={{
                              scaleX: [0, 1, 0],
                              opacity: [0, 0.3, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: j * 0.7,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Glowing orbs */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full bg-primary/10 blur-xl"
                    style={{
                      width: `${Math.random() * 200 + 100}px`,
                      height: `${Math.random() * 200 + 100}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.05, 0.15, 0.05],
                      x: [0, Math.random() * 30 - 15, 0],
                      y: [0, Math.random() * 30 - 15, 0],
                    }}
                    transition={{
                      duration: Math.random() * 6 + 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>

              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-primary/20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -80],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>

              {/* Tech circuit patterns */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`circuit-${i}`}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    <div className="relative w-24 h-24">
                      {/* Circuit lines */}
                      <div className="absolute inset-0">
                        {[...Array(4)].map((_, j) => (
                          <motion.div
                            key={`circuit-line-${j}`}
                            className="absolute h-[1px] bg-primary/15"
                            style={{
                              width: "100%",
                              top: `${j * 33}%`,
                            }}
                            animate={{
                              scaleX: [0, 1],
                              opacity: [0, 0.3, 0],
                            }}
                            transition={{
                              duration: 3.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: j * 0.8,
                            }}
                          />
                        ))}
                      </div>
                      {/* Circuit nodes */}
                      {[...Array(4)].map((_, j) => (
                        <motion.div
                          key={`circuit-node-${j}`}
                          className="absolute w-2 h-2 rounded-full bg-primary/20"
                          style={{
                            left: `${j % 2 === 0 ? "0" : "100%"}`,
                            top: `${Math.floor(j / 2) * 100}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: j * 0.8,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="relative">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1]
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <Header />
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.4, 
                  delay: 0.4,
                  ease: [0.23, 1, 0.32, 1]
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <Hero />
              </motion.div>

              <LazySection delay={0.2} threshold={0.15}>
                <Features />
              </LazySection>

              <LazySection delay={0.2} threshold={0.15}>
                <FAQ />
              </LazySection>

              <LazySection delay={0.2} threshold={0.15}>
                <CTA />
              </LazySection>

              <LazySection delay={0.2} threshold={0.15}>
                <Footer />
              </LazySection>
            </div>

            {/* Scroll to top button */}
            <ScrollToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}