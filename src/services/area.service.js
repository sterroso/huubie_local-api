import * as AreaRepository from "../repositories/area.repository.js";

export const createArea = async (areaData) => {
	return await AreaRepository.createArea(areaData);
};

export const getAreaById = async (areaId) => {
	return await AreaRepository.getAreaById(areaId);
};

export const getAreas = async (page, pageSize, query) => {
	return await AreaRepository.getAreas(page, pageSize, query);
};
