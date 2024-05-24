import fs, { readFile, writeFile } from "fs";

import path from "path";

// trae todas las Areas de la bd sin filtrar nada
export const getAllAreas = async () => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		const areas = jsonData.flatMap((item) => item.areas);
		return areas;
	}
};

// trae las Areas de un Branch
export const getAreasByBranchId = async (branchId) => {
	const filePath = path.join(process.cwd(), "prisma", "db.json");
	const data = await fs.promises.readFile(filePath, "utf-8");
	if (data) {
		let jsonData = await JSON.parse(data);
		let areas = jsonData.flatMap((item) => item.areas);
		areas = areas.filter((item) => item.branch_id == branchId);
		return areas;
	}
};
