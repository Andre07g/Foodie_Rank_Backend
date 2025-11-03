import { body } from "express-validator";

export const createUsuarioDTO = [
    body("nombre")
        .isString()
        .trim()
        .isLength({ min: 10 })
        .withMessage("El nombre debe ser string y tener mínimo 10 caracteres"),
    
    body("correo")
        .isEmail()
        .withMessage("El correo debe ser válido y contener @"),

    body("contraseña")
        .isString()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
];

export const updateUsuarioDTO = [
    body("nombre")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 10 }),

    body("correo")
        .optional()
        .isEmail(),

    body("contraseña")
        .optional()
        .isString()
        .isLength({ min: 8 }),

    body("rol")
        .optional()
        .isIn(["Admin", "User"]),

    body("estado")
        .optional()
        .isIn(["Activo", "Bloqueado"]),
];
