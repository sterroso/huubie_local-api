import * as EmployeeService from "../services/employee.service.js";
import { validationResult } from "express-validator";
import { validatePage, validatePageSize } from "../utils/httpRequest.utils.js";

export const createEmployee = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const employee = await EmployeeService.createEmployee(req.body);
		res.status(201).json({ employee: employee });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getEmployeeById = async (req, res) => {
	const { id } = req.params;

	try {
		const employee = await EmployeeService.getEmployeeById(id);
		if (!employee) {
			return res
				.status(404)
				.json({ message: `Employee with ID ${id} not found.` });
		}
		res.status(200).json({ employee: employee });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getEmployees = async (req, res) => {
	const { page, pageSize } = req.query;
	const pageNum = validatePage(page);
	const pageSizeNum = validatePageSize(pageSize);
	const query = {};

	try {
		const employees = await EmployeeService.getEmployees(
			pageNum,
			pageSizeNum,
			query
		);
		if (!employees || employees.length < 1) {
			return res.status(404).json({ message: "No employees were found." });
		}
		res.status(200).json({ employees: employees });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
