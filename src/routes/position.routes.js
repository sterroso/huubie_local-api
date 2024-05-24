import { Router } from "express";
import * as PositionController from "../controllers/position.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", PositionController.getPositions);

router.get("/:eid", PositionController.getPositionsByEntityId);

router.get("/id/:id", PositionController.getPositionById);

export default router;
