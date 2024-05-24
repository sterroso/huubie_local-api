import * as EmployeeRepository from "../repositories/employee.repository.js";

export const createEmployee = async (employeeData) => {
	return await EmployeeRepository.createEmployee(employeeData);
};

export const getEmployeeById = async (employeeId) => {
	return await EmployeeRepository.getEmployeeById(employeeId);
};

export const getEmployees = async (page, pageSize, query) => {
	return await EmployeeRepository.getEmployees(page, pageSize, query);
};
