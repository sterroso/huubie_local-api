import { Router } from "express";
import { createUserDto, updateUserDto } from "../dtos/user.dto.js";
import * as UserController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createUserDto, UserController.createUser);

router.get("/:id", authenticate, UserController.getUserById);

router.get("/email/:email", authenticate, UserController.getUserByEmail);

router.get("/", authenticate, UserController.getUsers);

router.put("/:id", authenticate, updateUserDto, UserController.updateUser);

router.patch("/:id", authenticate, updateUserDto, UserController.updateUser);

router.delete("/:id", authenticate, UserController.deleteUser);

export default router;
