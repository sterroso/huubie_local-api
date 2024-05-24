import * as PositionService from "../services/position.service.js";
import { validationResult } from "express-validator";
import { validatePage, validatePageSize } from "../utils/httpRequest.utils.js";

export const getPositions = async (req, res) => {
	const { page, pageSize } = req.query;
	const pageNum = validatePage(page);
	const pageSizeNum = validatePageSize(pageSize);
	const query = {};

	try {
		const positions = await PositionService.getPositions(
			pageNum,
			pageSizeNum,
			query
		);
		if (!positions || positions.length < 1) {
			return res.status(404).json({ message: "No positions were found." });
		}
		res.status(200).json({ positions: positions });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getPositionsByEntityId = async (req, res) => {
	const { eid } = req.params;

	try {
		const positions = await PositionService.getPositionsByEntityId(eid);
		if (!positions || positions.length < 1) {
			return res.status(404).json({ message: "No positions were found." });
		}
		res.status(200).json({ position: positions });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getPositionById = async (req, res) => {
	const { id } = req.params;

	try {
		const position = await PositionService.getPositionById(id);
		if (!position) {
			return res
				.status(404)
				.json({ message: `Position with ID ${id} not found.` });
		}
		res.status(200).json({ position: position });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// export const createPosition = async (req, res) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}

// 	try {
// 		const position = await PositionService.createPosition(req.body);
// 		res.status(201).json({ position: position });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };
