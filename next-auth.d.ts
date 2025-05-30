import { Role } from "@prisma/client";
import NextAuth, { DefaultSession, type DefalutSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  provider?: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
