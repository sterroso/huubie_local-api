import { Router } from "express";
import { createUserDto } from "../dtos/user.dto.js";
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.post("/", createUserDto, UserController.createUser);

export default router;
