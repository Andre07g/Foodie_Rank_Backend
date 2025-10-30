import { Router } from "express";
import { createPlatoDTO, updatePlatoDTO } from "../dtos/platos_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import {
  obtenerTodosLosPlatos,
  obtenerUnPlato,
  crearUnPlato,
  actualizarUnPlato,
  eliminarUnPlato,
} from "../controllers/platos_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Platos
 *   description: Endpoints para la gestión de platos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Plato:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del plato
 *           example: 671f7d2a94c2c0a9e4f52c43
 *         nombre:
 *           type: string
 *           description: Nombre del plato
 *           example: Bandeja Paisa
 *         precio:
 *           type: number
 *           description: Precio del plato
 *           example: 25000
 *         descripcion:
 *           type: string
 *           description: Descripción breve del plato
 *           example: Plato típico colombiano con frijoles, carne, chicharrón y aguacate
 *         imagen:
 *           type: string
 *           description: URL o nombre del archivo de imagen del plato
 *           example: https://miapp.com/imagenes/bandeja-paisa.jpg
 *         restaurante:
 *           type: string
 *           description: ID del restaurante al que pertenece el plato
 *           example: 671f4f5a94c2c0a9e4f50e12
 *     CrearPlatoInput:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - descripcion
 *         - imagen
 *         - restaurante
 *       properties:
 *         nombre:
 *           type: string
 *           example: Arepa con Queso
 *         precio:
 *           type: number
 *           example: 8000
 *         descripcion:
 *           type: string
 *           example: Arepa rellena de queso fundido
 *         imagen:
 *           type: string
 *           example: https://miapp.com/imagenes/arepa-queso.jpg
 *         restaurante:
 *           type: string
 *           example: 671f4f5a94c2c0a9e4f50e12
 *     MensajeRespuesta:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: El Plato fue creado correctamente
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Plato no encontrado
 */

/**
 * @swagger
 * /platos:
 *   get:
 *     summary: Obtener todos los platos registrados
 *     tags: [Platos]
 *     responses:
 *       200:
 *         description: Lista completa de platos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plato'
 *       500:
 *         description: Error interno al obtener los platos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", obtenerTodosLosPlatos);

/**
 * @swagger
 * /platos/{id}:
 *   get:
 *     summary: Obtener un plato por su ID
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del plato a consultar
 *         schema:
 *           type: string
 *           example: 671f7d2a94c2c0a9e4f52c43
 *     responses:
 *       200:
 *         description: Plato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plato'
 *       404:
 *         description: Plato no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno
 */
router.get("/:id", obtenerUnPlato);

/**
 * @swagger
 * /platos:
 *   post:
 *     summary: Crear un nuevo plato
 *     tags: [Platos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearPlatoInput'
 *     responses:
 *       201:
 *         description: Plato creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", createPlatoDTO, validationDTO, crearUnPlato);

/**
 * @swagger
 * /platos/{id}:
 *   patch:
 *     summary: Actualizar un plato existente
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del plato a actualizar
 *         schema:
 *           type: string
 *           example: 671f7d2a94c2c0a9e4f52c43
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Plato Actualizado
 *               precio:
 *                 type: number
 *                 example: 12000
 *               descripcion:
 *                 type: string
 *                 example: Descripción modificada del plato
 *               imagen:
 *                 type: string
 *                 example: https://miapp.com/imagenes/plato-actualizado.jpg
 *               restaurante:
 *                 type: string
 *                 example: 671f4f5a94c2c0a9e4f50e12
 *     responses:
 *       202:
 *         description: Plato actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       404:
 *         description: Plato no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id", updatePlatoDTO, validationDTO, actualizarUnPlato);

/**
 * @swagger
 * /platos/{id}:
 *   delete:
 *     summary: Eliminar un plato por su ID
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del plato a eliminar
 *         schema:
 *           type: string
 *           example: 671f7d2a94c2c0a9e4f52c43
 *     responses:
 *       200:
 *         description: Plato eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeRespuesta'
 *       404:
 *         description: Plato no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", eliminarUnPlato);

export default router;
