import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient(); 

export const createBranch = async (branchData) =>{
  return await prisma.branch.create({
    data: branchData,
    select: {
      id: true,
      name: true,
      addres_line_one: true,
      address_line_two : true,
      entity_id: true

    }
  });
};
export const updateBranch = async (branchId, branchData, branchById) =>{
  return await prisma.branch.update({
    were: {},
    data: branchData,
    select: {
      name: true,
      address_line_one: true,
      address_line_two: true

    }
  });
};