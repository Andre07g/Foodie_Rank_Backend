
import { body } from "express-validator";

export const createCategoriaDTO = [
    body("nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio"),

    body("descripcion")
        .isString().withMessage("La descripción debe ser texto")
        .trim()
        .notEmpty().withMessage("La descripción es obligatoria")
        .isLength({ min: 5 }).withMessage("Mínimo 5 caracteres en la descripción"),
];

export const updateCategoriaDTO = [
    body("nombre")
        .optional()
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacío"),

    body("descripcion")
        .optional()
        .isString().withMessage("La descripción debe ser texto")
        .trim()
        .notEmpty().withMessage("La descripción no puede estar vacía")
        .isLength({ min: 5 }).withMessage("Mínimo 5 caracteres en la descripción"),
];
