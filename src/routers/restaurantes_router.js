import { Router } from "express";
import { createRestauranteDTO, updateRestauranteDTO } from "../dtos/restaurantes_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import {
  obtenerTodosLosRestaurantes,
  obtenerUnRestaurantePorID,
  actualizarUnRestaurante,
  crearUnRestaurante,
  eliminarUnRestaurante,
} from "../controllers/restaurantes_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurantes
 *   description: Endpoints para la gestión de restaurantes
 */

/**
 * @swagger
 * /restaurantes:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: Lista de todos los restaurantes disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurante'
 *       500:
 *         description: Error al obtener los restaurantes
 */
router.get("/", obtenerTodosLosRestaurantes);

/**
 * @swagger
 * /restaurantes/{id}:
 *   get:
 *     summary: Obtener un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", obtenerUnRestaurantePorID);

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: Crear un nuevo restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestauranteCreate'
 *     responses:
 *       201:
 *         description: Restaurante creado correctamente
 *       400:
 *         description: Error en los datos enviados o en la validación
 */
router.post("/", createRestauranteDTO, validationDTO, crearUnRestaurante);

/**
 * @swagger
 * /restaurantes/{id}:
 *   patch:
 *     summary: Actualizar un restaurante existente
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestauranteUpdate'
 *     responses:
 *       202:
 *         description: Restaurante actualizado correctamente
 *       404:
 *         description: Restaurante no encontrado
 */
router.patch("/:id", updateRestauranteDTO, validationDTO, actualizarUnRestaurante);

/**
 * @swagger
 * /restaurantes/{id}:
 *   delete:
 *     summary: Eliminar un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Restaurante eliminado correctamente
 *       404:
 *         description: Restaurante no encontrado
 */
router.delete("/:id", eliminarUnRestaurante);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurante:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "671d8b72b8f7a0b5d99e7c44"
 *         nombre:
 *           type: string
 *           example: "Restaurante El Sabor de Casa"
 *         ubicacion:
 *           type: string
 *           example: "Calle 45 #27-36, Bucaramanga"
 *         imagen:
 *           type: string
 *           example: "https://example.com/imagen-restaurante.jpg"
 *         popularidad:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4.7
 *         categoria:
 *           type: string
 *           description: ID de la categoría asociada
 *           example: "671d8c91b8f7a0b5d99e7d00"
 *         usuario:
 *           type: string
 *           description: ID del usuario que registró el restaurante
 *           example: "671d8c22b8f7a0b5d99e7d10"
 *
 *     RestauranteCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - ubicacion
 *         - imagen
 *         - categoria
 *         - usuario
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pizzería La Toscana"
 *         ubicacion:
 *           type: string
 *           example: "Carrera 12 #45-89, Bucaramanga"
 *         imagen:
 *           type: string
 *           example: "https://example.com/pizzeria.jpg"
 *         popularidad:
 *           type: number
 *           example: 4.5
 *         categoria:
 *           type: string
 *           example: "671d8c91b8f7a0b5d99e7d00"
 *         usuario:
 *           type: string
 *           example: "671d8c22b8f7a0b5d99e7d10"
 *
 *     RestauranteUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pizzería La Toscana Gourmet"
 *         ubicacion:
 *           type: string
 *           example: "Carrera 12 #45-90, Bucaramanga"
 *         imagen:
 *           type: string
 *           example: "https://example.com/pizzeria-new.jpg"
 *         popularidad:
 *           type: number
 *           example: 4.8
 *         categoria:
 *           type: string
 *           example: "671d8c91b8f7a0b5d99e7d01"
 */
