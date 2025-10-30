import  { Router } from "express";
import { createUsuarioDTO, updateUsuarioDTO } from "../dtos/usuarios_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import { obtenerTodosLosUsuarios, obtenerUnUsuarioPorID, crearUnUsuario, actualizarUnUsuario, eliminarUnUsuario, iniciarSesion } from "../controllers/usuarios_controller.js";
import { verificarToken } from "../middlewares/validationTOKEN.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

router.get("/", obtenerTodosLosUsuarios);
router.get("/buscar/:id", obtenerUnUsuarioPorID);
router.post("/", createUsuarioDTO, validationDTO,crearUnUsuario);
router.patch("/:id", updateUsuarioDTO, validationDTO,actualizarUnUsuario);
router.delete("/:id", eliminarUnUsuario);
router.post("/login", iniciarSesion);

// rutas protegidas

// user logeado

router.get("/logged/perfil",verificarToken,(req,res)=>{res.json({mensaje:`Bienvenido, ${req.usuario.nombre}`})});

router.get("/logged/admin",verificarToken,verificarAdmin,(req,res)=>{res.json({mensaje:`Bienvenido, ${req.usuario.nombre}, ${req.usuario.rol}`})})

export default router;