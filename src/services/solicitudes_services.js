import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_SOLICITUDES = "solicitudes"


export async function obtenerSolicitudes(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_SOLICITUDES).find().toArray();

}

export async function obtenerSolicitudPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_SOLICITUDES).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearSolicitud(data){
   
const {nombre, ubicacion, imagen,categoria,usuario} = data;
    const categoriaID = new ObjectId(categoria)
    
    const Solicitud = {nombre, ubicacion, imagen, popularidad:null, categoria:categoriaID,usuario}
    const db = await obtenerBD()
    await db.collection(COLECCION_SOLICITUDES).insertOne(Solicitud);
    return {message:"El Solicitud fue creada correctamente"};
}

export async function actualizarSolicitud(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_SOLICITUDES).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Solicitud no encontrada");}
    return {message: "Solicitud modificada correctamente"};
}

export async function eliminarSolicitud(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_SOLICITUDES).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Solicitud no encontrada");}
    return {message:"Solicitud eliminada correctamente"}

}