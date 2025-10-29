import  { Router } from "express";
 import { createUsuarioDTO, updateUsuarioDTO } from "../dtos/usuarios_dto.js";
 import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodosLosUsuarios, obtenerUnUsuarioPorID, crearUnUsuario, actualizarUnUsuario, eliminarUnUsuario } from "../controllers/usuarios_controller.js";

const router = Router();

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUnUsuarioPorID);
router.post("/", createUsuarioDTO, validationDTO,crearUnUsuario);
router.patch("/:id", updateUsuarioDTO, validationDTO,actualizarUnUsuario);
router.delete("/:id", eliminarUnUsuario);

export default router;