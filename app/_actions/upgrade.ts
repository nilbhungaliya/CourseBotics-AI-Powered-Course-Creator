'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SubscriptionStatus, SubscriptionPlan } from '@prisma/client'

export const upgradeUser = async (orderId: string, paymentId: string) => {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

    // Update user's subscription status in the database
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isPro: true,
        proExpiresAt: endDate,
        subscription: {
          upsert: {
            create: {
              status: SubscriptionStatus.ACTIVE,
              plan: SubscriptionPlan.PRO,
              endDate,
              paypalOrderId: orderId,
              paypalPaymentId: paymentId,
            },
            update: {
              status: SubscriptionStatus.ACTIVE,
              plan: SubscriptionPlan.PRO,
              endDate,
              paypalOrderId: orderId,
              paypalPaymentId: paymentId,
            },
          },
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error upgrading user:', error)
    return { success: false, error: 'Failed to upgrade user' }
  }
}

export const checkSubscriptionStatus = async () => {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        subscription: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const isActive = user.isPro && user.proExpiresAt && user.proExpiresAt > new Date()
    
    if (!isActive && user.subscription?.status === SubscriptionStatus.ACTIVE) {
      // Update subscription status if it has expired
      await db.subscription.update({
        where: {
          userId: user.id,
        },
        data: {
          status: SubscriptionStatus.EXPIRED,
        },
      })
    }

    return {
      isPro: isActive,
      subscription: user.subscription,
    }
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return { isPro: false, subscription: null }
  }
} 