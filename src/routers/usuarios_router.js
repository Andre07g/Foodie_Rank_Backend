/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios y autenticación
 */

import { Router } from "express";
import { createUsuarioDTO, updateUsuarioDTO } from "../dtos/usuarios_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import { 
  obtenerTodosLosUsuarios, 
  obtenerUnUsuarioPorID, 
  crearUnUsuario, 
  actualizarUnUsuario, 
  eliminarUnUsuario, 
  iniciarSesion 
} from "../controllers/usuarios_controller.js";
import { verificarToken } from "../middlewares/validationTOKEN.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get("/", obtenerTodosLosUsuarios);

/**
 * @swagger
 * /api/usuarios/buscar/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get("/buscar/:id", obtenerUnUsuarioPorID);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en la validación o datos incorrectos
 */
router.post("/register", createUsuarioDTO, validationDTO, crearUnUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Actualizar datos de un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       202:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.patch("/:id", updateUsuarioDTO, validationDTO, actualizarUnUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", eliminarUnUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token y datos del usuario
 *       400:
 *         description: Correo o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", iniciarSesion);

/**
 * @swagger
 * /api/usuarios/logged/perfil:
 *   get:
 *     summary: Obtener el perfil del usuario logueado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *       401:
 *         description: Token no válido o ausente
 */
router.get("/logged/perfil", verificarToken, (req, res) => {
  res.json({ mensaje: `Bienvenido, ${req.usuario.nombre}` });
});

/**
 * @swagger
 * /api/usuarios/logged/admin:
 *   get:
 *     summary: Acceder al panel solo para administradores
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido a un usuario con rol Admin
 *       403:
 *         description: Acceso denegado, no es administrador
 *       401:
 *         description: Token no válido o ausente
 */
router.get("/logged/admin", verificarToken, verificarAdmin, (req, res) => {
  res.json({ mensaje: `Bienvenido, ${req.usuario.nombre}, ${req.usuario.rol}` });
});

export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e1
 *         nombre:
 *           type: string
 *           example: Juan Pérez
 *         correo:
 *           type: string
 *           example: juanperez@example.com
 *         rol:
 *           type: string
 *           enum: [Admin, User]
 *           example: User
 *         estado:
 *           type: string
 *           enum: [Activo, Bloqueado]
 *           example: Activo
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nombre
 *         - correo
 *         - contraseña
 *       properties:
 *         nombre:
 *           type: string
 *           example: Carlos Ramírez
 *         correo:
 *           type: string
 *           example: carlosramirez@example.com
 *         contraseña:
 *           type: string
 *           example: miContraseñaSegura123
 *     UsuarioUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Nuevo Nombre
 *         correo:
 *           type: string
 *           example: nuevo@example.com
 *         rol:
 *           type: string
 *           enum: [Admin, User]
 *         estado:
 *           type: string
 *           enum: [Activo, Bloqueado]
 *     LoginInput:
 *       type: object
 *       required:
 *         - emailUser
 *         - contraseniaUser
 *       properties:
 *         emailUser:
 *           type: string
 *           example: juanperez@example.com
 *         contraseniaUser:
 *           type: string
 *           example: 12345678
 */

router.get("/logged/verificar", verificarToken, (req, res) => {
  res.json({
    valido: true,
    usuario: req.usuario
  });
});


router.get("/logged/id", verificarToken, (req, res) => {
  if (!req.usuario) {
    return res.status(401).json({ exito: false, mensaje: "No autenticado" });
  }

  res.json({
    exito: true,
    usuarioId: req.usuario.id, 
    nombre: req.usuario.nombre,
    rol: req.usuario.rol
  });
  console.log("asddassd")
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.clearCookie("usuario", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ exito: true, mensaje: "Sesión cerrada correctamente" });
});

router.get("/api/verificar-admin", verificarToken, verificarAdmin, (req, res) => {
  res.status(200).json({ exito: true, mensaje: "Eres admin", usuario: req.usuario });
});
