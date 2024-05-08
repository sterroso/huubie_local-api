import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      avatar_url: true
    }
  })
};
