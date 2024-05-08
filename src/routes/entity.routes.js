import { Router } from "express";
import { createEntityDto } from "../dtos/entity.dto.js";
import * as EntityController from '../controllers/entity.controller.js';

const router = Router();

router.post("/", createEntityDto, EntityController.createEntity);

export default router;