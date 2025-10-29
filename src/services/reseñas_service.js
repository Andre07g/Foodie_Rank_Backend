import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_RESEÑAS = "reseñas"



export async function obtenerReseñas(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_RESEÑAS).find().toArray();

}

export async function obtenerReseñaPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_RESEÑAS).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearReseña(data){
    const {usuario, restaurante, calificacion, comentario, likes, dislikes} = data;

    const Reseña = {usuario, restaurante, calificacion, comentario, likes, dislikes}
    const db = await obtenerBD()
    await db.collection(COLECCION_RESEÑAS).insertOne(Reseña);
    return {message:"La Reseña fue creada correctamente"};
}

export async function actualizarReseña(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESEÑAS).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Reseña no encontrada");}
    return {message: "Reseña modificada correctamente"};
}

export async function eliminarReseña(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESEÑAS).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Reseña no encontrada");}
    return {message:"Reseña eliminada correctamente"}

}