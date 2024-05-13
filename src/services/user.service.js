import bcrypt from "bcryptjs";
import * as UserRepository from "../repositories/user.repository.js";

export const createUser = async (userData) => {
	const salt = await bcrypt.genSalt(10);
	userData.password = await bcrypt.hash(userData.password, salt);

	return await UserRepository.createUser(userData);
};

export const getUserById = async (userId) => {
	return await UserRepository.getUserById(userId);
};

export const getUserByEmail = async (userEmail) => {
	return await UserRepository.getUserByEmail(userEmail);
};

export const getUsers = async (page, pageSize, query) => {
	return await UserRepository.getUsers(page, pageSize, query);
};

export const updateUser = async (id, data) => {
	return await UserRepository.updateUser(id, data);
};

export const deleteUser = async (id, reqUser) => {
	return await UserRepository.deleteUser(id, reqUser);
};
