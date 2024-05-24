import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArea = async (data) => {
	return await prisma.area.create({
		data: data,
		select: {
			id: true,
			name: true,
			branch_id: true,
			employees: true,
		},
	});
};

export const getAreaById = async (id) => {
	return await prisma.area.findUniqueOrThrow({
		where: { id: id, deleted: false },
		select: {
			id: true,
			name: true,
			branch_id: true,
			employees: true,
		},
	});
};

export const getAreas = async (page = 1, pageSize = 10, query = {}) => {
	const offset = pageSize * (page - 1);

	return await prisma.area.findMany({
		where: { ...query, deleted: false },
		skip: offset,
		take: pageSize,
		select: {
			id: true,
			name: true,
			branch_id: true,
			employees: true,
		},
	});
};
