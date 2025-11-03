import { body } from "express-validator";

export const createSolicitudDTO = [
    body("nombre")
        .isString()
        .trim()
        .notEmpty(),

    body("ubicacion")
        .isString()
        .trim()
        .isLength({ min: 5 }),

    body("imagen")
        .isString()
        .trim()
        .notEmpty(),

    body("usuario")
        .isMongoId()
        .withMessage("Debe ser un ID de usuario válido"),
    body("descripcion").isString()
        .trim()
        .isLength({ min: 5 }),
];

export const updateSolicitudDTO = createSolicitudDTO.map(val =>
    val.optional()
);
