import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageTransition, FadeIn, ScaleIn } from "@/components/ui/page-transition"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <PageTransition className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <ScaleIn>
          <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 mb-4">
                  <FileQuestion className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  404
                </h1>
                
                <FadeIn delay={0.1}>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Page Not Found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The page you are looking for doesn&apos;t exist or has been moved.
                  </p>
                </FadeIn>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    variant="default"
                    className="w-full"
                    asChild
                  >
                    <Link href="/">
                      Return home
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/dashboard">
                      Go to dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </PageTransition>
  )
}