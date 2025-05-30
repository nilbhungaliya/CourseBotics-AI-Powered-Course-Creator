'use server'

import { getVerificationTokenByToken } from '@/data/verification-token'
import prisma from '@/db'
import { auth } from '@/auth'

export const verifyToken = async (token: string | null, type: string | null) => {
  if (!token || !type) {
    return { error: 'Invalid verification link' }
  }

  try {
    const verificationToken = await getVerificationTokenByToken(token)

    if (!verificationToken) {
      return { error: 'Invalid or expired verification link' }
    }

    if (verificationToken.expires < new Date()) {
      return { error: 'Verification link has expired' }
    }

    if (type === 'change-email') {
      // Update user's email
      await prisma.user.update({
        where: { id: verificationToken.userId },
        data: { email: verificationToken.email },
      })

      // Force session update by updating the user's updatedAt field
      await prisma.user.update({
        where: { id: verificationToken.userId },
        data: { updatedAt: new Date() },
      })
    }

    // Delete the verification token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    return { success: type === 'change-email' ? 'Email updated successfully' : 'Password reset successful' }
  } catch (error) {
    console.error('Verification error:', error)
    return { error: 'Something went wrong' }
  }
} 