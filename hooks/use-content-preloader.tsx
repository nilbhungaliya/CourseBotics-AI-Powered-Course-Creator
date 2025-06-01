"use client";

import { useState, useEffect } from "react";

interface UseContentPreloaderProps {
  dependencies?: any[];
  minLoadingTime?: number;
}

export function useContentPreloader({ 
  dependencies = [], 
  minLoadingTime = 1500 
}: UseContentPreloaderProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let minTimeTimeout: NodeJS.Timeout;
    let dependenciesResolved = false;
    let minTimeElapsed = false;

    // Simulate progress
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90 && !dependenciesResolved) {
          return prev; // Hold at 90% until dependencies resolve
        }
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    // Check if dependencies are resolved
    const checkDependencies = () => {
      const allResolved = dependencies.every(dep => 
        dep !== null && dep !== undefined && dep !== false
      );
      
      if (allResolved || dependencies.length === 0) {
        dependenciesResolved = true;
        setProgress(100);
      }
    };

    // Set minimum loading time
    minTimeTimeout = setTimeout(() => {
      minTimeElapsed = true;
      checkDependencies();
      
      // If both conditions are met, stop loading
      if (dependenciesResolved && minTimeElapsed) {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, minLoadingTime);

    // Check dependencies immediately and on changes
    checkDependencies();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimeout);
    };
  }, [dependencies, minLoadingTime]);

  // Additional effect to handle when dependencies resolve after min time
  useEffect(() => {
    const allResolved = dependencies.every(dep => 
      dep !== null && dep !== undefined && dep !== false
    );
    
    if (allResolved && progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [dependencies, progress]);

  return { isLoading, progress };
}