import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPosition = async (data) => {
	return await prisma.position.create({
		data: data,
		select: {
			id: true,
			title: true,
			description: true,
			entity_id: true,
			employees: true,
		},
	});
};

export const getPositionById = async (id) => {
	return await prisma.position.findUniqueOrThrow({
		where: { id: id, deleted: false },
		select: {
			id: true,
			title: true,
			description: true,
			entity_id: true,
			employees: true,
		},
	});
};

export const getPositions = async (page = 1, pageSize = 10, query = {}) => {
	const offset = pageSize * (page - 1);

	return await prisma.position.findMany({
		where: { ...query, deleted: false },
		skip: offset,
		take: pageSize,
		select: {
			id: true,
			title: true,
			description: true,
			entity_id: true,
			employees: true,
		},
	});
};
