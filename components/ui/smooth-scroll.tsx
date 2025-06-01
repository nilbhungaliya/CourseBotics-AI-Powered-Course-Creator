"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function SmoothScroll() {
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create ultra-smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.1,
    restDelta: 0.0001,
  });

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    if (typeof window !== "undefined") {
      // Add scroll event listener
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    /* Enhanced scroll progress indicator */
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 z-50 origin-left shadow-sm"
      style={{ 
        scaleX: smoothProgress,
        opacity: isScrolling ? 1 : 0.7
      }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}