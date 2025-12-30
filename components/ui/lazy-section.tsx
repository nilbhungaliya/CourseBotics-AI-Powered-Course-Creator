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
    margin: "0px 0px -50px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0.4, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}