import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      entity_id: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      avatar_url: true
    }
  })
};

export const getUserById = async (userId) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id: userId, deleted: false },
    select: {
      id: true,
      email: true,
      entity_id: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      avatar_url: true,
      role: true,
    }
  });
};

export const getUserByEmail = async (userEmail) => {
  return await prisma.user.findUniqueOrThrow({
    where: { email: userEmail, deleted: false },
    select: {
      id: true,
      email: true,
      entity_id: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      avatar_url: true,
      role_id: true,
    },
  });
};
