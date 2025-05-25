"use server"
import { SignUpSchema, SignUpType } from "@/schemas/SignUpSchema";
import bcrypt from "bcryptjs";
import prisma from "@/db";
import { getUserByEmail } from "@/data/user";
import { generateVarificationToken } from "@/lib/tokens";
import { sendVarificationEmail } from "@/lib/mail";

export const signUpAction = async (values: SignUpType) => {
  try {
    const { data, success, error } = SignUpSchema.safeParse(values);

    if (!success) {
      //   console.log({ error });
      console.log(error.errors[0].message);
      return {error: "Invalid Credentials" };
    }

    const { email, password, firstName, lastName } = data;

    const hashPassword = await bcrypt.hash(password, 10)

    const existingUsers = await getUserByEmail(email);

    if(existingUsers){
      return {error:"Email already Used!"}
    }

    const name = `${firstName} ${lastName}`;

    await prisma.user.create({
      data:{
        email,
        password:hashPassword,
        name
      }
    })

    const varificationToken = await generateVarificationToken(email);

    await sendVarificationEmail(varificationToken.email, varificationToken.token);

    return {
      success: "Confirmation email sent successfully! Please check your inbox.",
    };
  } catch (e) {
    console.log({ e});
    // if (isRedirectError(error)) throw error;
    return {error: "Invalid Credentials" };
  }
};
