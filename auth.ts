export const runtime = 'nodejs';
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "@/db";
import { getUserById } from "./data/user";
import { Prisma, Role } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth sign-ins without email verification
      if (account?.provider !== "credentials") return true;

      // For credentials provider, check if user exists and is verified
      const existingUser = await getUserById(user.id as string);

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) {
          return false;
        }

        await prisma.twoFactorConfirmation.delete({
            where:{id:twoFactorConfirmation.id}
        })
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        const existingUser = await getUserById(token.sub as string);
        if (existingUser) {
          session.user.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
          
          // Get the provider from the user's accounts
          const account = await prisma.account.findFirst({
            where: { userId: existingUser.id },
            select: { provider: true }
          });
          
          session.user.provider = account?.provider;
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
