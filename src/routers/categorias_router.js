import { Router } from "express";
import { createCategoriaDTO, updateCategoriaDTO } from "../dtos/categorias_dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";
import {
  obtenerTodasLasCategorias,
  crearUnaCategoria,
  actualizarUnaCategoria,
  eliminarUnaCategoria,
} from "../controllers/categorias.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para gestionar las categorías disponibles en el sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único generado por MongoDB
 *           example: 671d9ad5c7a821b9c0a1f2b3
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *           example: Bebidas
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la categoría
 *           example: Productos líquidos o gaseosos para el consumo
 *     CategoriaCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *       properties:
 *         nombre:
 *           type: string
 *           example: Postres
 *         descripcion:
 *           type: string
 *           example: Dulces y postres preparados en la tienda
 *     CategoriaUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Snacks
 *         descripcion:
 *           type: string
 *           example: Aperitivos ligeros para acompañar bebidas
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtiene todas las categorías registradas
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", obtenerTodasLasCategorias);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaCreate'
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: La categoria fue creada correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", createCategoriaDTO, validationDTO, crearUnaCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   patch:
 *     summary: Actualiza parcialmente una categoría existente
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: string
 *           example: 671d9ad5c7a821b9c0a1f2b3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaUpdate'
 *     responses:
 *       202:
 *         description: Categoría modificada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 message: Categoria modificada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:id", updateCategoriaDTO, validationDTO, actualizarUnaCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría según su ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *           example: 671d9ad5c7a821b9c0a1f2b3
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 message: Categoria eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", eliminarUnaCategoria);

export default router;
