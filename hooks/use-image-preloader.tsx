"use client";

import { useState, useEffect } from "react";

interface UseImagePreloaderProps {
  images: string[];
  onProgress?: (progress: number) => void;
}

export function useImagePreloader({ images, onProgress }: UseImagePreloaderProps) {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    const imagePromises = images.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const currentProgress = (loadedCount / images.length) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress);
          setLoadedImages(prev => [...prev, src]);
          resolve(src);
        };
        img.onerror = () => {
          loadedCount++;
          const currentProgress = (loadedCount / images.length) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress);
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, [images, onProgress]);

  return { loadedImages, isLoading, progress };
}