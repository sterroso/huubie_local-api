import * as AreaService from "../services/area.service.js";
import { validationResult } from "express-validator";
import { validatePage, validatePageSize } from "../utils/httpRequest.utils.js";

export const createArea = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const area = await AreaService.createArea(req.body);
		res.status(201).json({ area: area });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getAreaById = async (req, res) => {
	const { id } = req.params;

	try {
		const area = await AreaService.getAreaById(id);
		if (!area) {
			return res.status(404).json({ message: `Area with ID ${id} not found.` });
		}
		res.status(200).json({ area: area });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getAreas = async (req, res) => {
	const { page, pageSize } = req.query;
	const pageNum = validatePage(page);
	const pageSizeNum = validatePageSize(pageSize);
	const query = {};

	try {
		const areas = await AreaService.getAreas(pageNum, pageSizeNum, query);
		if (!areas || areas.length < 1) {
			return res.status(404).json({ message: "No areas were found." });
		}
		res.status(200).json({ areas: areas });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
