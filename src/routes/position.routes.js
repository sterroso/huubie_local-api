import { Router } from "express";
import * as PositionController from "../controllers/position.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, PositionController.getPositions);

router.get("/:id", authenticate, PositionController.getPositionById);

export default router;
