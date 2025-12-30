"use client";

import { useEffect } from "react";

export function ScrollPerformanceOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Optimize scroll performance - only on html element
    const optimizeScrolling = () => {
      const html = document.documentElement;

      // Set only essential properties for smooth scrolling on html only
      html.style.setProperty("-webkit-overflow-scrolling", "touch");
      html.style.setProperty("overscroll-behavior", "contain");

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