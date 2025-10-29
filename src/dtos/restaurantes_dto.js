
import { body } from "express-validator";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createRestauranteDTO = [
    body("nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio"),

    body("ubicacion")
        .isString().withMessage("La ubicación debe ser texto")
        .trim()
        .notEmpty().withMessage("La ubicación es obligatoria")
        .isLength({ min: 5 }).withMessage("Debe contener mínimo 5 caracteres"),

    body("imagen")
        .isURL().withMessage("La imagen debe ser una URL válida")
        .notEmpty().withMessage("La imagen es obligatoria"),

    body("popularidad")
        .isFloat({ min: 1, max: 5 }).withMessage("Popularidad debe ser un número entre 1 y 5")
        .notEmpty().withMessage("La popularidad es obligatoria"),

    body("categoria")
        .notEmpty().withMessage("La categoría es obligatoria")
        .matches(objectIdRegex).withMessage("ID de categoría inválido"),
];

export const updateRestauranteDTO = [
    body("nombre")
        .optional()
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacío"),

    body("ubicacion")
        .optional()
        .isString().withMessage("La ubicación debe ser texto")
        .trim()
        .notEmpty().withMessage("La ubicación no puede estar vacía"),

    body("imagen")
        .optional()
        .isURL().withMessage("La imagen debe ser una URL válida")
        .notEmpty().withMessage("La imagen no puede estar vacía"),

    body("popularidad")
        .optional()
        .isFloat({ min: 1, max: 5 }).withMessage("Popularidad debe ser entre 1 y 5")
        .notEmpty().withMessage("La popularidad no puede estar vacía"),

    body("categoria")
        .optional()
        .matches(objectIdRegex).withMessage("ID de categoría inválido"),
];
