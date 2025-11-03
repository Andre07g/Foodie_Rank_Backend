//imports
import express from "express";
import 'dotenv/config';
import { conectartBD } from "./config/db.js";
import categoriasRouter from "./routers/categorias_router.js"; 
import denunciosRouter from "./routers/denuncios_router.js"; 
import platosRouter from "./routers/platos_router.js";
import reseñasRouter from "./routers/reseñas_router.js";
import restaurantesRouter from "./routers/restaurantes_router.js"; 
import solicitudesRouter from "./routers/solicitudes_router.js"; 
import usuariosRouter from "./routers/usuarios_router.js";  
import cors from 'cors';
import rateLimit from "express-rate-limit";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import { verificarVersion } from "./utils/validadorDeFuncion.js";
import cookieParser from "cookie-parser";

//Config
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: "Demasiadas solicitudes, intenta más tarde." },
  standardHeaders: true,
  legacyHeaders: false
});

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://karolainreyes.github.io"
  ],
  credentials: true
}));

app.use(express.json());
app.use(limiter);

if (!verificarVersion()) {
  console.error("🚨 Versión no compatible. Deteniendo servidor...");
  process.exit(1);
}

// Rutas
app.use("/categorias", categoriasRouter);
app.use("/denuncios", denunciosRouter);
app.use("/platos", platosRouter);
app.use("/resenias", reseñasRouter);
app.use("/restaurantes", restaurantesRouter);
app.use("/solicitudes", solicitudesRouter);
app.use("/usuarios", usuariosRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend on" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;

conectartBD().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Error conectando a la BD:", err);
});
