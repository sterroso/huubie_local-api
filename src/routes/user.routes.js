import { Router } from "express";
import { createUserDto } from "../dtos/user.dto.js";
import * as UserController from '../controllers/user.controller.js';
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createUserDto, UserController.createUser);

router.get("/:id", authenticate, UserController.getUserById);

export default router;
