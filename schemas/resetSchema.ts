import { z } from "zod";

export const ResetSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase(),
});

export type ResetType = z.infer<typeof ResetSchema>;


export const ResetPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;