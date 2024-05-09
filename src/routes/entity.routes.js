import { Router } from "express";
import { createEntityDto, updateEntityDto } from "../dtos/entity.dto.js";
import * as EntityController from '../controllers/entity.controller.js';
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createEntityDto, EntityController.createEntity);

router.patch("/:id", authenticate, updateEntityDto, EntityController.updateEntity);

router.put("/:id", authenticate, updateEntityDto, EntityController.updateEntity);

router.delete("/:id", authenticate, EntityController.deleteEntity);

router.get("/:id", authenticate, EntityController.getEntityById);

router.get("/", authenticate, EntityController.getEntities);

export default router;