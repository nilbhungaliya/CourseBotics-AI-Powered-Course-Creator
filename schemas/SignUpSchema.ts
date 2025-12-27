import { z } from "zod";
import { isEmailDomainTrusted } from "@/lib/email-validation";

export const SignUpSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase()
    .refine(
      (email) => isEmailDomainTrusted(email),
      {
        message: "Please use a proper email from trusted providers (Gmail, Yahoo, Outlook, etc.)",
      }
    ),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
