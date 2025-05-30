import { NextResponse } from 'next/server'
import { upgradeUser } from '@/app/_actions/upgrade'

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    const accessToken = await getPayPalAccessToken()

    // Capture the payment
    const captureResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const captureData = await captureResponse.json()

    if (!captureResponse.ok) {
      throw new Error(captureData.message || 'Failed to capture payment')
    }

    // Update user's subscription
    const result = await upgradeUser(
      orderId,
      captureData.purchase_units[0].payments.captures[0].id
    )

    if (!result.success) {
      throw new Error('Failed to activate subscription')
    }

    return NextResponse.json({
      success: true,
      message: 'Payment captured and subscription activated successfully',
    })
  } catch (error) {
    console.error('Error capturing payment:', error)
    return NextResponse.json(
      { success: false, message: 'Error capturing payment' },
      { status: 500 }
    )
  }
} 