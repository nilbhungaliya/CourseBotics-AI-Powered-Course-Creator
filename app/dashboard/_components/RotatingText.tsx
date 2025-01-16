'use client'

import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

const words = ['AI', 'Course', 'Generator']
const ROTATION_INTERVAL = 2000 // 2 seconds per word

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % words.length)
        setIsAnimating(false)
      }, 500) // Half of the animation duration
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <span className="font-extrabold text-xl">
        <span className={cn(
          "inline-block transition-all duration-500",
          isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        )}>
          {words[currentIndex]}
        </span>
      </span>
    </div>
  )
}

