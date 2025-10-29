
//imports
import express from "express";
import 'dotenv/config'
import { conectartBD } from "./config/db.js";
import categoriasRouter from "./routers/categorias_router.js"; 
import denunciosRouter from "./routers/denuncios_router.js"; 
import platosRouter from "./routers/platos_router.js";
import reseñasRouter from "./routers/reseñas_router.js";
import restaurantesRouter from "./routers/restaurantes_router.js"; 
import solicitudesRouter from "./routers/solicitudes_router.js"; 
import usuariosRouter from "./routers/usuarios_router.js";  
import cors from 'cors'

//Config
const app = express();
app.use(cors());
app.use(express.json());

// Uso de rutas

app.use("/categorias",categoriasRouter);
app.use("/denuncios",denunciosRouter);
app.use("/platos",platosRouter);
app.use("/reseñas",reseñasRouter);
app.use("/restaurantes",restaurantesRouter);
app.use("/solicitudes",solicitudesRouter);
app.use("/usuarios",usuariosRouter);

app.get("/health", (req, res)=>{
    res.status(200).json({message: "Backend on"});
})

conectartBD().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend listening on http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})