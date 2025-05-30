'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PageTransition } from '@/components/ui/page-transition'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function UpgradePage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: async () => {
            try {
              const response = await fetch('/api/create-paypal-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: 900, // $9.00 in cents
                }),
              })

              const data = await response.json()
              if (!response.ok) {
                throw new Error(data.error || 'Failed to create order')
              }

              return data.id
            } catch (error) {
              console.error('Error creating order:', error)
              toast.error('Failed to create order')
            }
          },
          onApprove: async (data: any) => {
            try {
              const response = await fetch('/api/capture-paypal-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                }),
              })

              const result = await response.json()
              if (!response.ok) {
                throw new Error(result.message || 'Failed to capture payment')
              }

              toast.success('Payment successful! Welcome to Pro!')
              router.push('/dashboard')
            } catch (error) {
              console.error('Error capturing payment:', error)
              toast.error('Payment failed')
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err)
            toast.error('Payment failed')
          },
        }).render('#paypal-button-container')
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [router])

  return (
    <PageTransition className="container max-w-4xl py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Upgrade to Pro</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>Current Plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>✓ Basic course creation</li>
              <li>✓ Limited storage</li>
              <li>✓ Community support</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>$9/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>✓ Unlimited courses</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ Custom branding</li>
              <li>✓ API access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <div id="paypal-button-container" className="w-full" />
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  )
} 