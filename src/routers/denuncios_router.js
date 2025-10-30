import { Router } from "express";
import { createDenunciaDTO, updateDenunciaDTO } from "../dtos/denuncios_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import {
  obtenerTodosLosDenuncios,
  obtenerUnDenuncioPorID,
  crearUnDenuncio,
  actualizarUnDenuncio,
  eliminarUnDenuncio,
} from "../controllers/denuncios_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Denuncios
 *   description: Endpoints para gestionar denuncias de reseñas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Denuncio:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del denuncio (ObjectId de MongoDB)
 *           example: 671f4f5a94c2c0a9e4f50e32
 *         reseña:
 *           type: string
 *           description: ID de la reseña denunciada
 *           example: 671f4f5a94c2c0a9e4f50e12
 *     CrearDenuncioInput:
 *       type: object
 *       required:
 *         - reseña
 *       properties:
 *         reseña:
 *           type: string
 *           description: ID de la reseña que se está denunciando
 *           example: 671f4f5a94c2c0a9e4f50e12
 *     MensajeRespuesta:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: El Denuncio fue creado correctamente
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Denuncio no encontrado
 */

/**
 * @swagger
 * /denuncios:
 *   get:
 *     summary: Obtener todos los denuncios
 *     tags: [Denuncios]
 *     responses:
 *       200:
 *         description: Lista de todos los denuncios registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Denuncio'
 *       500:
 *         description: Error interno al obtener los denuncios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", obtenerTodosLosDenuncios);

/**
 * @swagger
 * /denuncios/{id}:
 *   get:
 *     summary: Obtener un denuncio por su ID
 *     tags: [Denuncios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del denuncio a buscar
 *         schema:
 *           type: string
 *           example: 671f4f5a94c2c0a9e4f50e32
 *     responses:
 *       200:
 *         description: Denuncio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Denuncio'
 *       404:
 *         description: Denuncio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al obtener denuncio
 */
router.get("/:id", obtenerUnDenuncioPorID);

/**
 * @swagger
 * /denuncios:
 *   post:
 *     summary: Crear un nuevo denuncio
 *     tags: [Denuncios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearDenuncioInput'
 *     responses:
 *       201:
 *         description: Denuncio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       400:
 *         description: Error en los datos enviados o validación fallida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", createDenunciaDTO, validationDTO, crearUnDenuncio);

/**
 * @swagger
 * /denuncios/{id}:
 *   patch:
 *     summary: Actualizar un denuncio existente
 *     tags: [Denuncios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del denuncio a actualizar
 *         schema:
 *           type: string
 *           example: 671f4f5a94c2c0a9e4f50e32
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reseña:
 *                 type: string
 *                 description: Nuevo ID de reseña asociado al denuncio
 *                 example: 671f4f5a94c2c0a9e4f50e12
 *     responses:
 *       202:
 *         description: Denuncio modificado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       404:
 *         description: Denuncio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id", updateDenunciaDTO, validationDTO, actualizarUnDenuncio);

/**
 * @swagger
 * /denuncios/{id}:
 *   delete:
 *     summary: Eliminar un denuncio por su ID
 *     tags: [Denuncios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del denuncio a eliminar
 *         schema:
 *           type: string
 *           example: 671f4f5a94c2c0a9e4f50e32
 *     responses:
 *       200:
 *         description: Denuncio eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       404:
 *         description: Denuncio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", eliminarUnDenuncio);

export default router;
