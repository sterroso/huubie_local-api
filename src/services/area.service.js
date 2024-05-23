import * as AreaRepository from "../repositories/area.repository.js";
import * as AreaRepositoryFS from "../repositories/area.repository.fs.js";

export const getAreas = async () => {
	return await AreaRepositoryFS.getAllAreas();
};

export const getAreasByBranchId = async (bid) => {
	return await AreaRepositoryFS.getAreasByBranchId(bid);
};

// Código viejo
// -------------------------------
// export const createArea = async (areaData) => {
// 	return await AreaRepository.createArea(areaData);
// };

// export const getAreaById = async (areaId) => {
// 	return await AreaRepository.getAreaById(areaId);
// };

// export const getAreas = async (page, pageSize, query) => {
// 	return await AreaRepository.getAreas(page, pageSize, query);
// };
// -------------------------------
