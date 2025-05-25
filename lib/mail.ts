import ChallengeEmail from "@/emails/challenge";
import ResetPasswordEmail from "@/emails/resetPassword";
import VarificationEmail from "@/emails/varification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVarificationEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_DOMAIN}/new-verification?token=${token}`;

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS as string,
    to: email,
    subject: "Confirmation Email",
    react: VarificationEmail({ data: { link } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
};

export const sendResendPasswordEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_DOMAIN}/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS as string,
    to: email,
    subject: "Confirmation Email",
    react: ResetPasswordEmail({ data: { link } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS as string,
    to: email,
    subject: "Two Factor Authentication mail",
    react: ChallengeEmail({ data: { token } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
};
