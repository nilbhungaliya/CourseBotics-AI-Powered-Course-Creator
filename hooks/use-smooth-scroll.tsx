"use client";

import { useEffect, useCallback } from "react";

interface UseSmoothScrollOptions {
  duration?: number;
  easing?: string;
  offset?: number;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { duration = 800, easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)", offset = 0 } = options;

  useEffect(() => {
    // Minimal smooth scrolling setup to avoid conflicts
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      const body = document.body;
      
      // Only set essential smooth scrolling properties
      html.style.scrollBehavior = "smooth";
      body.style.scrollBehavior = "smooth";
      
      // Add momentum scrolling for iOS
      // html.style.webkitOverflowScrolling = "touch";
      // body.style.webkitOverflowScrolling = "touch";
      
      // Prevent overscroll
      html.style.overscrollBehavior = "contain";
      body.style.overscrollBehavior = "contain";
    }
  }, []);

  const scrollToElement = useCallback((
    element: HTMLElement | string,
    customOptions?: Partial<UseSmoothScrollOptions>
  ) => {
    const targetElement = typeof element === "string" 
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!targetElement) return;

    const finalOffset = customOptions?.offset ?? offset;
    const targetPosition = targetElement.offsetTop - finalOffset;

    // Use native smooth scrolling with enhanced options
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }, [offset]);

  const scrollToTop = useCallback((customOptions?: Partial<UseSmoothScrollOptions>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const scrollToPosition = useCallback((
    position: number,
    customOptions?: Partial<UseSmoothScrollOptions>
  ) => {
    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition
  };
}