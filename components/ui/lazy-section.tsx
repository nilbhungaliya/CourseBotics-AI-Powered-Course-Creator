"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function LazySection({ 
  children, 
  className = "", 
  delay = 0,
  threshold = 0.1 
}: LazySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "0px 0px -100px 0px" // Start animation before element is fully visible
  });

  return (
    <motion.div
      ref={ref}
      className={cn("smooth-section", className)}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.3, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for ultra-smooth animation
      }}
    >
      {children}
    </motion.div>
  );
}