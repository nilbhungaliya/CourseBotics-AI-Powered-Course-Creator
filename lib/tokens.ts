import { getVarificationTokenByEmail } from "@/data/varification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";


export const generateVarificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVarificationTokenByEmail(email);

  if (existingToken) {
    await prisma.varificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const varificationToken = await prisma.varificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return varificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};


export const generateTwoFactorToken = async (email:string)=>{
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
}