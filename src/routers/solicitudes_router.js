/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Endpoints para gestionar solicitudes de lugares o entidades
 */

import { Router } from "express";
import { createSolicitudDTO, updateSolicitudDTO } from "../dtos/solicitudes_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import { 
  obtenerTodasLasSolicitudes, 
  obtenerUnaSolicitudPorID, 
  crearUnaSolicitud, 
  actualizarUnaSolicitud, 
  eliminarUnaSolicitud 
} from "../controllers/solicitudes_controller.js";

const router = Router();

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtener todas las solicitudes
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de todas las solicitudes registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitud'
 *       500:
 *         description: Error al obtener todas las solicitudes
 */
router.get("/", obtenerTodasLasSolicitudes);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   get:
 *     summary: Obtener una solicitud por su ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error al obtener la solicitud
 */
router.get("/:id", obtenerUnaSolicitudPorID);

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crear una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolicitudInput'
 *     responses:
 *       201:
 *         description: Solicitud creada correctamente
 *       400:
 *         description: Datos inválidos o error de validación
 */
router.post("/", createSolicitudDTO, validationDTO, crearUnaSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   patch:
 *     summary: Actualizar una solicitud existente
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolicitudInput'
 *     responses:
 *       202:
 *         description: Solicitud modificada correctamente
 *       404:
 *         description: Solicitud no encontrada
 */
router.patch("/:id", updateSolicitudDTO, validationDTO, actualizarUnaSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Eliminar una solicitud por su ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente
 *       404:
 *         description: Solicitud no encontrada
 */
router.delete("/:id", eliminarUnaSolicitud);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitud:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e1
 *         nombre:
 *           type: string
 *           example: Parque Central
 *         ubicacion:
 *           type: string
 *           example: Calle 45 #23-10, Bucaramanga
 *         imagen:
 *           type: string
 *           example: https://example.com/parque.jpg
 *         popularidad:
 *           type: number
 *           example: 4.5
 *         categoria:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e2
 *         usuario:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e3
 *     SolicitudInput:
 *       type: object
 *       required:
 *         - nombre
 *         - ubicacion
 *         - imagen
 *         - usuario
 *       properties:
 *         nombre:
 *           type: string
 *           example: Restaurante El Buen Sabor
 *         ubicacion:
 *           type: string
 *           example: Carrera 27 #15-08, Bucaramanga
 *         imagen:
 *           type: string
 *           example: https://example.com/restaurante.jpg
 *         popularidad:
 *           type: number
 *           example: 4.2
 *         categoria:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e2
 *         usuario:
 *           type: string
 *           example: 671b8f4a0d7c4a9f3f88b7e3
 */
