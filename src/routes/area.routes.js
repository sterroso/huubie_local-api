import { Router } from "express";
import * as AreaController from "../controllers/area.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", AreaController.getAreas);
router.get("/:bid", AreaController.getAreasByBranchId);
// router.get("/:bid/:id", AreaController.getAreaById); // todo

// router.get("/", authenticate, AreaController.getAreas); //* aqui esta el original
// router.get("/:id", authenticate, AreaController.getAreaById);

export default router;
