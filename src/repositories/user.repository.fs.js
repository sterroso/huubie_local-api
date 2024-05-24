import fs, { readFile, writeFile } from "fs";

import path from "path";

export const getUsers = async () => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		const users = jsonData.flatMap((item) => item.users);
		return users;
	}
};

export const getUsersByEntityId = async (entityId) => {
	console.log(entityId), "id";
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let users = jsonData
			.flatMap((item) => item.users)
			.filter((item) => item.entity_id == entityId);
		return users;
	}
};

export const getUserById = async (userId) => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let user = jsonData
			.flatMap((item) => item.users)
			.filter((item) => item.id == userId);
		return user;
	}
};

export const getUserByEmail = async (userEmail) => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let users = jsonData
			.flatMap((item) => item.users)
			.filter((item) => item.email == userEmail);
		return users;
	}
};
