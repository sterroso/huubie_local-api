import { promises as fs } from 'fs';
import path from 'path';

export const getEntitiesFromDbJson = async () => {
  try {
    const filePath = path.join(process.cwd(), 'prisma', 'db.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    const allEntities = jsonData.entities.map(entity => ({
      id: entity.id,
      legal_name: entity.legal_name,
      tax_id: entity.tax_id,
      address_line_one: entity.address_line_one,
      address_line_two: entity.address_line_two,
      subscription_status: entity.subscription_status,
    }));

    return allEntities;
  } catch (error) {
    throw new Error(`Failed to read or parse db.json: ${error.message}`);
  }
};



// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const getEntities = async (page = 1, pageSize = 10, query = {}) => {
//   const offset = pageSize * (page - 1);

//   return await prisma.entity.findMany({
//     where: { ...query, deleted: false },
//     skip: offset,
//     take: pageSize,
//     select: {
//       id: true,
//       tax_id: true,
//       legal_name: true,
//       subscription_status: true
//     }
//   });
// };



// export const createEntity = async (entityData) => {
//   return await prisma.entity.create({
//     data: entityData,
//     select: {
//       id: true,
//       legal_name: true,
//       tax_id: true,
//       subscription_status: true,
//       address_line_one: true,
//       address_line_two: true
//     }
//   });
// };

// export const updateEntity = async (entityId, entityData) => {
//   return await prisma.entity.update({
//     where: { id: entityId, deleted: false },
//     data: entityData,
//     select: {
//       id: true,
//       tax_id: true,
//       legal_name: true,
//       subscription_status: true,
//       address_line_one: true,
//       address_line_two: true,
//     },
//   });
// };

// export const deleteEntity = async (entityId, reqUserId) => {
//   return await prisma.entity.update({
//     where: { id: entityId, deleted: false },
//     data: {
//       deleted: true,
//       deleted_at: new Date().toISOString(),
//       deleted_by: reqUserId
//     },
//     select: {
//       id: true
//     }
//   });
// };

// export const getEntityById = async (entityId) => {
//   return await prisma.entity.findUniqueOrThrow({
//     where: { id: entityId, deleted: false },
//     select: {
//       id: true,
//       tax_id: true,
//       legal_name: true,
//       subscription_status: true,
//       address_line_one: true,
//       address_line_two: true
//     }
//   });
// };

// export const getEntityByTaxId = async (entityTaxId) => {
//   return await prisma.entity.findUniqueOrThrow({
//     where: { tax_id: entityTaxId, deleted: false },
//     select: {
//       id: true,
//       tax_id: true,
//       legal_name: true,
//       subscription_status: true,
//       address_line_one: true,
//       address_line_two: true,
//       created_at: false,
//       updated_at: false,
//       deleted: false,
//       deleted_at: false,
//       deleted_by: false
//     }
//   });
// };

// export const getActiveRecordsCount = async (query) => {
//   return await prisma.entity.count({
//     where: { ...query, deleted: false }
//   });
// }
