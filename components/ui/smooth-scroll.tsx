"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function SmoothScroll() {
  const { scrollYProgress } = useScroll();
  
  // Create smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  });

  return (
    /* Enhanced scroll progress indicator */
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 z-50 origin-left"
      style={{ 
        scaleX: smoothProgress,
      }}
    />
  );
}