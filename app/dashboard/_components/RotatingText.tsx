'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const words = ['Course', 'Botics', 'AI']
const ROTATION_INTERVAL = 2000 // 2 seconds per word

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-sm opacity-70 animate-pulse" />
        <div className="relative">
          <Image 
            src="/courseBotics-logo.svg" 
            alt="CourseBotics" 
            width={36} 
            height={36} 
            className="h-9 w-9 rounded-full bg-background p-1 border border-primary/20 shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative h-7 w-[120px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[currentIndex]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center"
            >
              <span className="font-bold text-lg tracking-tight text-primary">
                {words[currentIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

