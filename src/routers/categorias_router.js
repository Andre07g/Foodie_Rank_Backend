import { Router } from "express";
 import { createCategoriaDTO,updateCategoriaDTO } from "../dtos/categorias_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodasLasCategorias, crearUnaCategoria, actualizarUnaCategoria, eliminarUnaCategoria } from "../controllers/categorias.controller.js";

const router = Router();

router.get("/", obtenerTodasLasCategorias);
router.post("/", createCategoriaDTO, validationDTO,crearUnaCategoria);
router.patch("/:id", updateCategoriaDTO, validationDTO, actualizarUnaCategoria);
router.delete("/:id", eliminarUnaCategoria);

export default router;