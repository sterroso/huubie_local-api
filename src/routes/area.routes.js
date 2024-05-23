import { Router } from "express";
import * as AreaController from "../controllers/area.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", AreaController.getAreas); //? elimine el authenticate pero si te da problemas vuelvelo a poner
//* No hay mucho que hacer aqui, asi que ve a areaController =>
//* http://localhost:4000/api/v1/areas/  <= este es el path con el que podras probar en postman/thunder client


// router.get("/", authenticate, AreaController.getAreas); //* aqui esta el original
// router.get("/:id", authenticate, AreaController.getAreaById);

export default router;
