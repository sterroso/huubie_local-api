import { Router } from "express";
import { createUserDto, updateUserDto } from "../dtos/user.dto.js";
import * as UserController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", UserController.getUsers);

router.get("/:eid", UserController.getUsersByEntityId);

router.get("/id/:id", UserController.getUserById);

router.get("/email/:email", UserController.getUserByEmail);

// router.post("/", createUserDto, UserController.createUser);

// router.put("/:id", authenticate, updateUserDto, UserController.updateUser);

// router.patch("/:id", authenticate, updateUserDto, UserController.updateUser);

// router.delete("/:id", authenticate, UserController.deleteUser);

export default router;
