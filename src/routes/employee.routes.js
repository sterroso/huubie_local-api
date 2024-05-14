import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as EmployeeController from '../controllers/employee.controller.js';
import { createEmployeeDto, updateEmployeeDto } from "../dtos/employee.dto";

const router = Router();

router.post("/", authenticate, createEmployeeDto, EmployeeController.createEmployee);

router.get("/:id", authenticate, EmployeeController.getEmployeeById);

router.get("/:branchId", authenticate, EmployeeController.getAllEmployeesByBranchId);

router.get("/:entityId", authenticate, EmployeeController.getAllEmployeesByEntityId);

router.put("/:id", authenticate, updateEmployeeDto, EmployeeController.updateEmployee);

router.delete("/:id", authenticate, EmployeeController.deleteEmployee);

export default router;
