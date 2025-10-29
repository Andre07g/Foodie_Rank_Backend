import { Router } from "express";
 import { createPlatoDTO, updatePlatoDTO } from "../dtos/platos_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodosLosPlatos, obtenerUnPlato, actualizarUnPlato, crearUnPlato, eliminarUnPlato} from "../controllers/platos_controller.js";

const router = Router();

router.get("/", obtenerTodosLosPlatos);
router.get("/:id", obtenerUnPlato);
router.post("/", createPlatoDTO, validationDTO,crearUnPlato);
router.patch("/:id", updatePlatoDTO, validationDTO, actualizarUnPlato);
router.delete("/:id", eliminarUnPlato);

export default router;