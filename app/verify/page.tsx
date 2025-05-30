'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageTransition } from '@/components/ui/page-transition'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { verifyToken } from '@/app/_actions/verify'
import { useSession } from 'next-auth/react'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { update } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('token')
      const type = searchParams.get('type')

      if (!token || !type) {
        toast.error('Invalid verification link')
        router.push('/')
        return
      }

      try {
        const result = await verifyToken(token, type)
        
        if (result.error) {
          toast.error(result.error)
          router.push('/')
          return
        }

        setIsVerified(true)
        toast.success(result.success)
        
        // Update session after successful verification
        if (type === 'change-email') {
          await update()
        }
      } catch (error) {
        console.error('Verification error:', error)
        toast.error('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [searchParams, router, update])

  if (isLoading) {
    return (
      <PageTransition className="container max-w-4xl py-10">
        <Card>
          <CardContent className="flex items-center justify-center py-10">
            <p>Verifying...</p>
          </CardContent>
        </Card>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {isVerified ? 'Verification Successful' : 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
          <p className="text-center text-muted-foreground">
            {isVerified
              ? 'Your email has been successfully verified. You can now close this window.'
              : 'The verification link is invalid or has expired.'}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/')}>Return to Home</Button>
            <Button onClick={() => router.push('/dashboard')} variant="secondary">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
} 