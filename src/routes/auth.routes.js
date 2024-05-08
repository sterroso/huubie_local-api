import { Router } from "express";
import * as AuthController from '../controllers/auth.controller.js';

const router = Router();

router.post('/', AuthController.loginUser);

export default router;
