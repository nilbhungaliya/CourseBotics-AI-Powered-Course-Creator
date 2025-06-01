"use client";

import { useEffect } from "react";

export function ScrollPerformanceOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Optimize scroll performance without conflicting with existing styles
    const optimizeScrolling = () => {
      const html = document.documentElement;
      const body = document.body;

      // Set only essential properties for smooth scrolling
      const scrollProperties = {
        webkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
      };

      // Apply minimal optimizations
      Object.entries(scrollProperties).forEach(([property, value]) => {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        html.style.setProperty(cssProperty, value);
        body.style.setProperty(cssProperty, value);
      });

      // Add passive event listeners for better performance
      const passiveOptions = { passive: true };
      
      // Throttle scroll events for better performance
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Minimal scroll handling
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, passiveOptions);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    const cleanup = optimizeScrolling();
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
}