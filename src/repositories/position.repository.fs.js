import fs, { readFile, writeFile } from "fs";

import path from "path";

export const getPositions = async () => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		const positions = jsonData.flatMap((item) => item.positions);
		return positions;
	}
};

export const getPositionsByEntityId = async (entityId) => {
	console.log(entityId), "id";
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let positions = jsonData
			.flatMap((item) => item.positions)
			.filter((item) => item.entity_id == entityId);
		return positions;
	}
};

export const getPositionById = async (positionId) => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let position = jsonData
			.flatMap((item) => item.positions)
			.filter((item) => item.id == positionId);
		return position;
	}
};
