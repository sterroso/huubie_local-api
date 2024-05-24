import * as AreaService from "../services/area.service.js";

export const getAreas = async (req, res) => {
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

export const getAreasByBranchId = async (req, res) => {
	const { bid } = req.params;
	console.log(bid);
	try {
		const areas = await AreaService.getAreasByBranchId(bid);
		if (!areas || areas.length < 1) {
			return res.status(404).json({ message: "No areas were found." });
		}
		res.status(200).json({ areas: areas });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
