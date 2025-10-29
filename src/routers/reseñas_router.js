import { Router } from "express";
 import { createReseñaDTO, updateReseñaDTO } from "../dtos/reseñas_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodasLasReseñas, obtenerUnaReseñaPorID, crearUnaReseña, actualizarUnaReseña, eliminarUnaReseña } from "../controllers/reseñas_controller.js";

const router = Router();

router.get("/", obtenerTodasLasReseñas);
router.get("/:id", obtenerUnaReseñaPorID);
router.post("/", createReseñaDTO, validationDTO,crearUnaReseña);
router.patch("/:id", updateReseñaDTO, validationDTO,actualizarUnaReseña);
router.delete("/:id", eliminarUnaReseña);

export default router;