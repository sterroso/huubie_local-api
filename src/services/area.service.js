import * as AreaRepository from "../repositories/area.repository.js";

export const getAreas = async () => {
	return await AreaRepository.getAreas();
};
//* solo elimine lo del paginado
//* al 100% no entiendo la funcionalidad de service jajaja, sergio lo hizo
//* pero como no estorba lo dejemos y continuemos con areaRepository =>

// export const createArea = async (areaData) => {
// 	return await AreaRepository.createArea(areaData);
// };

// export const getAreaById = async (areaId) => {
// 	return await AreaRepository.getAreaById(areaId);
// };

// export const getAreas = async (page, pageSize, query) => {
// 	return await AreaRepository.getAreas(page, pageSize, query);
// };
