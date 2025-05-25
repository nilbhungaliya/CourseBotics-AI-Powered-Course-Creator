import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoading({ items }: { items: number }) {
  return Array.from({ length: items || 3 }, (_, index) => (
    <motion.div
      key={index}
      className="rounded-xl border bg-card shadow-sm overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Status badge skeleton */}
      <div className="absolute top-3 left-3 z-20">
        <div className="h-5 w-20 bg-muted/60 animate-pulse rounded-full" />
      </div>
      
      {/* Image skeleton */}
      <div className="aspect-video bg-gradient-to-r from-muted/60 to-muted animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Badge skeleton */}
        <div className="h-5 w-20 bg-primary/10 animate-pulse rounded-full" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-muted/60 animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted/60 animate-pulse rounded" />
        </div>
        
        {/* Stats skeleton */}
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-24 bg-muted/60 animate-pulse rounded" />
          <div className="h-4 w-24 bg-muted/60 animate-pulse rounded" />
        </div>
      </div>
    </motion.div>
  ));
};

