import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Mi Proyecto Express",
      version: "1.0.0",
      description: "Documentación generada automáticamente con Swagger y JSDoc",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local de desarrollo",
      },
    ],
  },
  // Ruta donde Swagger buscará los comentarios de documentación
  apis: ["./src/routers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };
