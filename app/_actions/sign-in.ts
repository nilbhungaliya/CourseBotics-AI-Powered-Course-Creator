"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorEmail, sendverificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignInSchema, SignInType } from "@/schemas/SignInSchema";
import { AuthError } from "next-auth";
import prisma from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import bcrypt from "bcryptjs";

export const signInAction = async (values: SignInType) => {
  // console.log({ values });

  // console.log(typeof(values.email));

  const { data, success, error } = SignInSchema.safeParse(values);

  if (!success) {
    //   console.log({ error });
    console.log(error.errors[0].message);

    return { error: "Invalid credentials!" };
  }

  const existingUser = await getUserByEmail(data.email);
  // console.log(existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    existingUser.password
  );

  if (!passwordMatch) return { error: "Invalid credentials!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
      existingUser.id
    );
    await sendverificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Confirmation email sent successfully! Please check your inbox.",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (data.code) {
      // verfiy the code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Something went wrong!" };
      }

      if (twoFactorToken.token !== data.code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired!" };
      }
      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );
      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: `${DEFAULT_LOGIN_REDIRECT}?login=success`,
    });

    return {
      success: "Email sent successfully! Please check your inbox.",
    };
  } catch (e) {
    console.log({ e });
    // if (isRedirectError(error)) throw error;
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw e;
  }
};
