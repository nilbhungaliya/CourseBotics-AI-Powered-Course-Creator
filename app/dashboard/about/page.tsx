'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  useEffect(() => {
    window.open('https://nilbhungaliya.nil1204.shop', '_blank')
  }, [])

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">Taking you to my portfolio website</p>
      </div>
    </div>
  )
} 