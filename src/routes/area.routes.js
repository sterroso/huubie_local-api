import { Router } from "express";
import * as AreaController from "../controllers/area.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, AreaController.getAreas);

router.get("/:id", authenticate, AreaController.getAreaById);

export default router;
