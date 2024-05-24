import { Router } from "express";
import * as EmployeeController from "../controllers/employee.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createEmployeeDto, updateEmployeeDto } from "../dtos/employee.dto.js";

const router = Router();

router.post("/", createEmployeeDto, EmployeeController.createEmployee);

router.get("/", authenticate, EmployeeController.getEmployees);

router.get("/:id", authenticate, EmployeeController.getEmployeeById);

export default router;
