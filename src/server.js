
//imports
import express from "express";
import 'dotenv/config'
import { conectartBD } from "./config/db.js";
import cors from 'cors'

//Config
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res)=>{
    res.status(200).json({message: "Backend on"});
})

conectartBD().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend listening on http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})