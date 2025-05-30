"use server"
import { getUserByEmail } from "@/data/user";
import { sendResendPasswordEmail} from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";
import { ResetSchema, ResetType } from "@/schemas/resetSchema";

export const reset = async (values: ResetType) => {
  const { data, success, error } = ResetSchema.safeParse(values);
  
  if (!success) {
    //   console.log({ error });
    console.log(error.errors[0].message);

    return { error: "Invalid credentials!" };
  }

  const existingUser = await getUserByEmail(data.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  const verificationToken = await generateResetPasswordToken(existingUser.email);
  await sendResendPasswordEmail(verificationToken.email, verificationToken.token);

  return { success: "Email sent successfully! Please check your inbox." };

};
