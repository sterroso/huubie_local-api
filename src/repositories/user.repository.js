import { PrismaClient } from "@prisma/client";

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
			avatar_url: true,
		},
	});
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
			role_id: true,
		},
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

export const getUsers = async (page = 1, pageSize = 10, query = {}) => {
	const offset = pageSize * (page - 1);

	return await prisma.user.findMany({
		where: { ...query, deleted: false },
		skip: offset,
		take: pageSize,
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

export const updateUser = async (userId, userData) => {
	const { role_id, entity_id, ...userDataWithoutIds } = userData;
	if (entity_id)
		userDataWithoutIds.entity = { connect: { id: userData.entity_id } };
	if (role_id) userDataWithoutIds.role = { connect: { id: userData.role_id } };
	console.log(userDataWithoutIds, "Data");

	return await prisma.user.update({
		where: { id: userId, deleted: false },
		data: userDataWithoutIds,
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

export const deleteUser = async (userId, reqUserId) => {
	return await prisma.user.update({
		where: { id: userId, deleted: false },
		data: {
			deleted: true,
			deleted_at: new Date().toISOString(),
			deleted_by: reqUserId,
		},
		select: {
			id: true,
		},
	});
};
