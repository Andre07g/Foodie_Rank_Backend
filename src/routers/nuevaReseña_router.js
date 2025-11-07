import { Router } from "express";
import { createReseñaDTO, updateReseñaDTO } from "../dtos/reseñas_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import {
  obtenerTodasLasReseñas,
  obtenerUnaReseñaPorID,
  crearUnaReseña,
  actualizarUnaReseña,
  eliminarUnaReseña,
  obtenerUnaReseñaPorIDCliente,
  notificarReseña,
  marcarNotificacion
} from "../controllers/reseñas_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Endpoints para gestionar reseñas de restaurantes
 */

/**
 * @swagger
 * /reseñas:
 *   get:
 *     summary: Obtener todas las reseñas
 *     tags: [Reseñas]
 *     responses:
 *       200:
 *         description: Lista de todas las reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reseña'
 *       500:
 *         description: Error al obtener las reseñas
 */
router.get("/", obtenerTodasLasReseñas);

/**
 * @swagger
 * tags:
 *   name: Notificar nuevas Reseñas
 *   description: Endpoints para notificar nuevas reseñas de restaurantes
 */

/**
 * @swagger
 * /reseñas:
 *   get:
 *     summary: Notificar nuevas reseñas
 *     tags: [Reseñas]
 *     responses:
 *       200:
 *         description: Lista de todas las nuevas reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reseña'
 *       500:
 *         description: Error al obtener las reseñas
 */
router.get("/nuevaReseña/:id", notificarReseña);

/**
 * @swagger
 * tags:
 *   name: Marcar notificacion vista
 *   description: Endpoints para marcar como vistas las nuevas reseñas de restaurantes
 */

/**
 * @swagger
 * /reseñas:
 *   get:
 *     summary: Marcar todas las reseñas
 *     tags: [Reseñas]
 *     responses:
 *       200:
 *         description: Lista de todas las reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reseña'
 *       500:
 *         description: Error al obtener las reseñas
 */
router.put("/notificaciones/:id/vista", obtenerTodasLasReseñas);


/**
 * @swagger
 * /reseñas/{id}:
 *   get:
 *     summary: Obtener una reseña por ID
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reseña'
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", obtenerUnaReseñaPorID);

/**
 * @swagger
 * /reseñas:
 *   post:
 *     summary: Crear una nueva reseña
 *     tags: [Reseñas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReseñaCreate'
 *     responses:
 *       201:
 *         description: Reseña creada correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", createReseñaDTO, validationDTO, crearUnaReseña);

/**
 * @swagger
 * /reseñas/{id}:
 *   patch:
 *     summary: Actualizar una reseña existente
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReseñaUpdate'
 *     responses:
 *       202:
 *         description: Reseña actualizada correctamente
 *       404:
 *         description: Reseña no encontrada
 */
router.patch("/:id", updateReseñaDTO, validationDTO, actualizarUnaReseña);

/**
 * @swagger
 * /reseñas/{id}:
 *   delete:
 *     summary: Eliminar una reseña por ID
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña eliminada correctamente
 *       404:
 *         description: Reseña no encontrada
 */
router.delete("/:id", eliminarUnaReseña);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Reseña:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "671c8b75b8f7a0b5d99e7b4a"
 *         usuario:
 *           type: string
 *           description: ID del usuario que hizo la reseña
 *           example: "671c8a9b3e1f5d4cba3e7f01"
 *         restaurante:
 *           type: string
 *           description: ID del restaurante reseñado
 *           example: "671c8aa13e1f5d4cba3e7f02"
 *         calificacion:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4.5
 *         comentario:
 *           type: string
 *           example: "Excelente atención y comida deliciosa."
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["671c8b00b8f7a0b5d99e7b4f"]
 *         dislikes:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *
 *     ReseñaCreate:
 *       type: object
 *       required:
 *         - usuario
 *         - restaurante
 *         - calificacion
 *         - comentario
 *       properties:
 *         usuario:
 *           type: string
 *           example: "671c8a9b3e1f5d4cba3e7f01"
 *         restaurante:
 *           type: string
 *           example: "671c8aa13e1f5d4cba3e7f02"
 *         calificacion:
 *           type: number
 *           example: 5
 *         comentario:
 *           type: string
 *           example: "La comida estuvo increíble."
 *
 *     ReseñaUpdate:
 *       type: object
 *       properties:
 *         calificacion:
 *           type: number
 *           example: 3.5
 *         comentario:
 *           type: string
 *           example: "Buena comida, pero el servicio fue lento."
 */

router.get("/user/:id",obtenerUnaReseñaPorIDCliente)