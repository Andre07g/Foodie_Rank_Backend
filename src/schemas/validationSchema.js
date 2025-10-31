// Inicio

// Usuarios

db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["nombre", "correo", "contraseña", "rol", "estado"],

            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Debe ser un string de por lo menos 10 caracteres",
                    minLength: 10
                },
                correo: {
                    bsonType: "string",
                    description: "El correo debe contener @",
                    pattern: "^.+@.+\\..+$"
                },
                contraseña: {
                    bsonType: "string",
                    description: "Contraseña hasheada",
                    minLength: 60
                },
                rol: {
                    bsonType: "string",
                    enum: ["Admin", "User"],
                    description: "Debe ser un tipo valido"
                },
                estado: {
                    bsonType: "string",
                    description: "El estado debe ser de tipo activo o bloqueado",
                    enum: ["Activo", "Bloqueado"]
                }
            }
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});

// Restaurantes

db.createCollection("restaurantes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["nombre", "ubicacion", "imagen", "popularidad","categoria","usuario"],

            properties: {
                nombre: {
                    bsonType: "string",
                    description: "El nombre no puede estar vacio",
                    minLength: 1
                },
                ubicacion: {
                    bsonType: "string",
                    description: "La direccion debe contener al menos 5 caracteres",
                    minLength: 5
                },
                imagen: {
                    bsonType: "string",
                    description: "URL de la imagen del restaurante",
                    minLength: 1
                },
                popularidad: {
                    bsonType: ["double", "null"],
                    description: "La popularidad debe ser un numero decimal",
                    minimum: 1,
                    maximum: 5
                },
                categoria: {
                    bsonType: "objectId",
                    description: "Id de la categoria"
                },
                usuario: {
                    bsonType: "objectId",
                    description: "Id del usuario al que pertenece"
                }
            }
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});

// Platos


db.createCollection("platos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["nombre", "precio", "descripcion", "imagen", "restaurante"],

            properties: {
                nombre: {
                    bsonType: "string",
                    description: "El nombre no puede estar vacio",
                    minLength: 1
                },
                precio: {
                    bsonType: "double",
                    description: "El precio debe ser al menos de 1",
                    minimum: 1
                },
                imagen: {
                    bsonType: "string",
                    description: "URL de la imagen del plato",
                    minLength: 1
                },
                descripcion: {
                    bsonType: "string",
                    description: "Descripcion del plato",
                    minLength: 5
                },
                restaurante: {
                    bsonType: "objectId",
                    description: "Id del restaurante al que pertenece"
                }
            }
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});

// Reseñas


db.createCollection("reseñas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["usuario", "restaurante", "calificacion", "comentario", "likes", "dislikes"],

            properties: {
                usuario: {
                    bsonType: "objectId",
                    description: "Id del usuario que la realizó"
                },
                calificacion: {
                    bsonType: "double",
                    description: "Calificacion del 1 al 5",
                    minimum: 1,
                    maximum:5
                },
                comentario: {
                    bsonType: "string",
                    description: "Comentario del usuario que realiza la reseña",
                    minLength: 1
                },
                restaurante: {
                    bsonType: "objectId",
                    description: "Id del restaurante al que pertenece"
                },
                likes:{
                    bsonType:"array",
                    description:"Usuarios que dan like a la reseña",
                    items: {
                        bsonType: "objectId",
                        description:"Id del usuario que likea la reseña"
                }},
                dislikes:{
                    bsonType:"array",
                    description:"Usuarios que dan dislike a la reseña",
                    items: {
                        bsonType: "objectId",
                        description:"Id del usuario que dislikea la reseña"
                }
            }}
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});


// Solicitudes


db.createCollection("solicitudes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["nombre", "ubicacion", "imagen", "popularidad","categoria"],

            properties: {
                nombre: {
                    bsonType: "string",
                    description: "El nombre no puede estar vacio",
                    minLength: 1
                },
                ubicacion: {
                    bsonType: "string",
                    description: "La direccion debe contener al menos 5 caracteres",
                    minLength: 5
                },
                imagen: {
                    bsonType: "string",
                    description: "URL de la imagen del restaurante",
                    minLength: 1
                },
                popularidad: {
                    bsonType: ["double", "null"],
                    description: "La popularidad debe ser un numero decimal",
                    minimum: 1,
                    maximum: 5
                },
                categoria: {
                    bsonType: "objectId",
                    description: "Id de la categoria"
                },
                usuario: {
                    bsonType: "objectId",
                    description: "Id del usuario al que pertenece"
                }
            }
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});

// Denuncias


db.createCollection("denuncios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["reseña"],

            properties: {
                reseña: {
                    bsonType: "objectId",
                    description: "Id de la reseña"
                }}
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});

db.createCollection("categoria", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            // Todos los campos principales requeridos.
            required: ["nombre","descripcion"],

            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Nombre de la categoria",
                    minLength:1
                },
                descripcion:{
                    bsonType:"string",
                    description:"Descripcion de la categoria",
                    minLength:1
                }
            
            }
        }
    },
    // La acción "error" asegura que la operación (inserción/actualización) falle si la validación falla.
    validationAction: "error",
    // Nivel "strict" asegura que la validación se aplique a todas las inserciones y actualizaciones.
    validationLevel: "strict"
});