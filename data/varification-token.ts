import prisma from "@/db";

export const getVarificationTokenByEmail = async (email: string) => {
  try {
    const varificationToken = await prisma.varificationToken.findUnique({
      where: { email },
    });
    return varificationToken;
  } catch (error) {
    return null;
  }
};

export const getVarificationTokenByToken = async (token: string) => {
  try {
    const varificationToken = await prisma.varificationToken.findUnique({
      where: { token },
    });
    return varificationToken;
  } catch (error) {
    return null;
  }
};
