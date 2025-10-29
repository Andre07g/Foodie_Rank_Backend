import { Router } from "express";
 import { createSolicitudDTO, updateSolicitudDTO } from "../dtos/solicitudes_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodasLasSolicitudes, obtenerUnaSolicitudPorID, crearUnaSolicitud, actualizarUnaSolicitud, eliminarUnaSolicitud } from "../controllers/solicitudes_controller.js";

const router = Router();

router.get("/", obtenerTodasLasSolicitudes);
router.get("/:id", obtenerUnaSolicitudPorID);
router.post("/", createSolicitudDTO, validationDTO,crearUnaSolicitud);
router.patch("/:id", updateSolicitudDTO, validationDTO,actualizarUnaSolicitud);
router.delete("/:id", eliminarUnaSolicitud);

export default router;