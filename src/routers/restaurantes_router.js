import { Router } from "express";
 import { createRestauranteDTO, updateRestauranteDTO } from "../dtos/restaurantes_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodosLosRestaurantes, obtenerUnRestaurantePorID, actualizarUnRestaurante, crearUnRestaurante, eliminarUnRestaurante } from "../controllers/restaurantes_controller.js";

const router = Router();

router.get("/", obtenerTodosLosRestaurantes);
router.get("/:id", obtenerUnRestaurantePorID);
router.post("/", createRestauranteDTO, validationDTO,crearUnRestaurante);
router.patch("/:id", updateRestauranteDTO, validationDTO,actualizarUnRestaurante);
router.delete("/:id", eliminarUnRestaurante);

export default router;