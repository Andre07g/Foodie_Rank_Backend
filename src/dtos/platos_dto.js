import { body } from "express-validator";

export const createPlatoDTO = [
    body("nombre")
        .isString()
        .trim()
        .notEmpty(),

    body("precio")
        .isFloat({ min: 1 })
        .withMessage("El precio mínimo es 1"),

    body("descripcion")
        .isString()
        .trim()
        .isLength({ min: 5 }),

    body("imagen")
        .isString()
        .trim()
        .notEmpty(),

    body("restaurante")
        .isMongoId()
        .withMessage("El restaurante debe ser un ObjectId válido"),
];

export const updatePlatoDTO = createPlatoDTO.map(val => val.optional());
