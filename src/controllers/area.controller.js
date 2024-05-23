import * as AreaService from "../services/area.service.js";

export const getAreas = async (req, res) => {
	//? Elimine lo del paginado para no complicarnos mas
	//* Toda esta logica y la de los demas archivos es para llevar la informacion
	//* pero de la base de datos al front. Lo que queremos ahorita es llevar
	//* la informacion pero del json al front.

	try {
		const areas = await AreaService.getAreas();
		if (!areas || areas.length < 1) {
			return res.status(404).json({ message: "No areas were found." });
		}
		res.status(200).json({ areas: areas });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//todo: yo creo que con tu logica que hiciste funciona.
//? te dejo mi codigo que lo mismo me parece xd:
// import * as EntityService from '../services/entity.service.js';

// export const getEntities = async (req, res) => {
// 	try {
// 		const entitiesFromDbJson = await EntityService.getEntitiesFromDbJson();

// 		if (entitiesFromDbJson.length > 0) {
// 			res.status(200).json(entitiesFromDbJson);
// 		} else {
// 			res.status(404).json({ message: "No entities were found in database." });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

//* continuemos con area.service =>


// import * as AreaService from "../services/area.service.js";
// import { validationResult } from "express-validator";
// import { validatePage, validatePageSize } from "../utils/httpRequest.utils.js";

// export const getAreas = async (req, res) => {
// 	const { page, pageSize } = req.query;
// 	const pageNum = validatePage(page);
// 	const pageSizeNum = validatePageSize(pageSize);
// 	const query = {};
	
// 	try {
// 		const areas = await AreaService.getAreas(pageNum, pageSizeNum, query);
// 		if (!areas || areas.length < 1) {
// 			return res.status(404).json({ message: "No areas were found." });
// 		}
// 		res.status(200).json({ areas: areas });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// export const createArea = async (req, res) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	}

// 	try {
// 		const area = await AreaService.createArea(req.body);
// 		res.status(201).json({ area: area });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// export const getAreaById = async (req, res) => {
// 	const { id } = req.params;

// 	try {
// 		const area = await AreaService.getAreaById(id);
// 		if (!area) {
// 			return res.status(404).json({ message: `Area with ID ${id} not found.` });
// 		}
// 		res.status(200).json({ area: area });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };