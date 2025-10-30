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
router.post("/login", async (req, res) => {
  try {
    const resultado = await login(req.body);

    if (!resultado.exito) {
      return res.status(400).json(resultado);
    }

    const usuario = resultado.usuario;

    // Crear token con info útil
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ exito: true, usuario, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
});
export default router;