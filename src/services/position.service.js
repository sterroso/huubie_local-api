import * as PositionRepository from "../repositories/position.repository.js";

export const createPosition = async (positionData) => {
	return await PositionRepository.createPosition(positionData);
};

export const getPositionById = async (positionId) => {
	return await PositionRepository.getPositionById(positionId);
};

export const getPositions = async (page, pageSize, query) => {
	return await PositionRepository.getPositions(page, pageSize, query);
};
