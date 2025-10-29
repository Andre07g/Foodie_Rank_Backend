import { body } from "express-validator";

export const createDenunciaDTO = [
    body("reseña")
        .isMongoId()
        .withMessage("Debe ser un ObjectId válido"),
];

export const updateDenunciaDTO = [
    body("reseña")
        .optional()
        .isMongoId()
];
