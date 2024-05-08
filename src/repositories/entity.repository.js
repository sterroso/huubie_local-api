import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEntity = async (entityData) => {
  return await prisma.entity.create({
    data: entityData,
    select: {
      id: true,
      legal_name: true,
      tax_id: true,
      subscription_status: true,
      address_line_one: true,
      address_line_two: true
    }
  });
};

export const updateEntity = async (entityId, entityData) => {
  return await prisma.entity.update({
    where: { id: entityId, deleted: false },
    data: entityData,
    select: {
      id: true,
      legal_name: true,
      tax_id: true,
      subscription_status: true,
      address_line_one: true,
      address_line_two: true,
    },
  });
};

export const deleteEntity = async (entityId, reqUserId) => {
  return await prisma.entity.update({
    where: { id: entityId, deleted: false },
    data: {
      deleted: true,
      deleted_at: new Date().toISOString(),
      deleted_by: reqUserId
    },
    select: {
      id: true
    }
  });
};
