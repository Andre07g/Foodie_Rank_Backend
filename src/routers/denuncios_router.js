import { Router } from "express";
 import { createDenunciaDTO, updateDenunciaDTO } from "../dtos/denuncios_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodosLosDenuncios, obtenerUnDenuncioPorID, crearUnDenuncio, actualizarUnDenuncio, eliminarUnDenuncio} from "../controllers/denuncios_controller.js";

const router = Router();

router.get("/", obtenerTodosLosDenuncios);
router.get("/:id", obtenerUnDenuncioPorID);
router.post("/", createDenunciaDTO, validationDTO,crearUnDenuncio);
router.patch("/:id", updateDenunciaDTO, validationDTO, actualizarUnDenuncio);
router.delete("/:id", eliminarUnDenuncio);

export default router;