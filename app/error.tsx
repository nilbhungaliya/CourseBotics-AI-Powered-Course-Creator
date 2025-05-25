"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PageTransition, FadeIn, ScaleIn } from "@/components/ui/page-transition"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <ScaleIn>
          <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3 mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Something went wrong!
                </h1>
                
                <FadeIn delay={0.1}>
                  <p className="text-muted-foreground mb-6">
                    {error.message || "An unexpected error occurred"}
                  </p>
                </FadeIn>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    onClick={reset}
                    className="w-full"
                    variant="default"
                  >
                    Try again
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/">
                      Return home
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {error.digest && (
              <div className="bg-muted px-6 py-3 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </div>
        </ScaleIn>
      </div>
    </PageTransition>
  )
}