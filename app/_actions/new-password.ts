"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/db";
import { ResetPasswordSchema, ResetPasswordType } from "@/schemas/resetSchema";
import bcrypt from "bcryptjs";

export const newPasswordAction = async (
  values: ResetPasswordType,
  token: string
) => {
  try {
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "User does not exist!" };
    }

    const { data, success, error } = ResetPasswordSchema.safeParse(values);

    if (!success) {
      //   console.log({ error });
      console.log(error.errors[0].message);
      return { error: "Invalid Credentials" };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashPassword },
    });

    await prisma.passwordResetToken.deleteMany({
      where: { email: existingToken.email },
    });

    return { success: "Password reset successfully!" };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong!" };
  }
};
