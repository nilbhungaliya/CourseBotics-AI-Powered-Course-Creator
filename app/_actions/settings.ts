'use server'

import { auth } from '@/auth'
import prisma from '@/db'
import { z } from 'zod'
import {sendEmailUpdateVerification } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import bcrypt from 'bcryptjs'
import { getUserById } from '@/data/user'

const SettingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  isTwoFactorEnabled: z.boolean().optional(),
})

const ChangeEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

export const updateUserSettings = async (values: z.infer<typeof SettingsSchema>) => {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: 'Unauthorized' }
    }

    const validatedFields = SettingsSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Invalid fields' }
    }

    const { name, isTwoFactorEnabled } = validatedFields.data

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        isTwoFactorEnabled,
      },
    })

    return { success: 'Settings updated successfully' }
  } catch (error) {
    console.error('Error updating settings:', error)
    return { error: 'Something went wrong' }
  }
}

export const changeEmail = async (values: z.infer<typeof ChangeEmailSchema>) => {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: 'Unauthorized' }
    }

    const validatedFields = ChangeEmailSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Invalid fields' }
    }

    const { email } = validatedFields.data
    
    // Check if email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: 'Email already in use' }
    }

    // Generate verification token
    const verificationToken = await generateVerificationToken(email, session.user.id)

    // Send verification email using the new method
    await sendEmailUpdateVerification(
      email,
      verificationToken.token
    )

    return { success: 'Verification email sent' }
  } catch (error) {
    console.error('Error changing email:', error)
    return { error: 'Something went wrong' }
  }
}

export const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: 'Unauthorized' }
    }

    const validatedFields = ChangePasswordSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: 'Invalid fields' }
    }

    const { currentPassword, newPassword } = validatedFields.data

    // Get user with current password
    const user = await getUserById(session.user.id);

    if (!user?.password) {
      return { error: 'User not found' }
    }

    // Verify current password
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordsMatch) {
      return { error: 'Current password is incorrect' }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword, updatedAt: new Date() },
    })

    return { success: 'Password updated successfully' }
  } catch (error) {
    console.error('Error changing password:', error)
    return { error: 'Something went wrong' }
  }
} 