import { body } from "express-validator";

export const createReseñaDTO = [
    body("usuario")
        .isMongoId()
        .withMessage("Debe ser un ID de usuario válido"),

    body("restaurante")
        .isMongoId()
        .withMessage("Debe ser un ID de restaurante válido"),

    body("calificacion")
        .isFloat({ min: 1, max: 5 })
        .withMessage("La calificación debe ser entre 1 y 5"),

    body("comentario")
        .isString()
        .trim()
        .isLength({ min: 1 }),

    body("likes")
        .optional()
        .isArray()
        .withMessage("Likes debe ser un array"),

    body("likes.*")
        .optional()
        .isMongoId(),

    body("dislikes")
        .optional()
        .isArray(),

    body("dislikes.*")
        .optional()
        .isMongoId(),
];

export const updateReseñaDTO = createReseñaDTO.map(val => val.optional());
