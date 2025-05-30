import { Role } from "@prisma/client";
import NextAuth, { DefaultSession, type DefalutSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  provider?: string;
  isPro: boolean;
  createdAt: Date;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
