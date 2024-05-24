import * as UserService from "../services/user.service.js";
import { validationResult } from "express-validator";
import { validatePage, validatePageSize } from "../utils/httpRequest.utils.js";

export const getUsers = async (req, res) => {
	// const { page, pageSize } = req.query;
	// const pageNum = validatePage(page);
	// const pageSizeNum = validatePageSize(pageSize);
	// const query = {};

	try {
		const users = await UserService.getUsers();
		if (!users || users.length < 1) {
			return res.status(404).json({ message: "No users were found." });
		}
		res.status(200).json({ users: users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await UserService.getUserById(id);

		if (!user) {
			return res.status(404).json({ message: `User with ID ${id} not found.` });
		}

		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getUserByEmail = async (req, res) => {
	const { email } = req.params;

	try {
		const user = await UserService.getUserByEmail(email);
		if (!user) {
			return res
				.status(404)
				.json({ message: `User with email ${email} not found.` });
		}
		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getUsersByEntityId = async (req, res) => {
	const { eid } = req.params;
	console.log("entityid", eid);
	try {
		const users = await UserService.getUsersByEntityId(eid);
		if (!users || users.length < 1) {
			return res.status(404).json({ message: "No users were found." });
		}
		res.status(200).json({ user: users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// export const createUser = async (req, res) => {
// 	const errors = validationResult(req);

// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}

// 	try {
// 		const user = await UserService.createUser(req.body);

// 		res.status(201).json({ user: user });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// export const updateUser = async (req, res) => {
// 	const { id } = req.params;
// 	console.log(id, "id");

// 	const user = req.body;
// 	const oldUser = await UserService.getUserById(id);
// 	const newUser = { ...oldUser, ...user };
// 	console.log(newUser, "newUser");

// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}
// 	try {
// 		const updatedUser = await UserService.updateUser(id, newUser);

// 		if (!updatedUser) {
// 			return res
// 				.status(404)
// 				.json({ message: `User with ID ${id} was not found.` });
// 		}

// 		res.status(200).json({ User: updatedUser });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: error.message });
// 	}
// };

// export const deleteUser = async (req, res) => {
// 	const { id } = req.params;
// 	const { user } = req;

// 	try {
// 		const deletedUser = await UserService.deleteUser(id, user.userId);

// 		if (!deletedUser) {
// 			return res
// 				.status(404)
// 				.json({ message: `User with ID ${id} was not found.` });
// 		}

// 		res.status(200).json({ deleted: deletedUser.id });
// 	} catch (error) {
// 		console.log("error");
// 		res.status(500).json({ error: error.message });
// 	}
// };
