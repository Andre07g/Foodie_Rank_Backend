import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_DENUNCIOS = "denuncios"



export async function obtenerDenuncios(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_DENUNCIOS).find().toArray();

}

export async function obtenerDenuncioPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_DENUNCIOS).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearDenuncio(data){
    const {reseña} = data;
    const reseñaID = new ObjectId(reseña)
    const Denuncio = {reseña:reseñaID}
    const db = await obtenerBD()
    await db.collection(COLECCION_DENUNCIOS).insertOne(Denuncio);
    return {message:"El Denuncio fue creado correctamente"};
}

export async function actualizarDenuncio(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_DENUNCIOS).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Denuncio no encontrado");}
    return {message: "Denuncio modificado correctamente"};
}

export async function eliminarDenuncio(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_DENUNCIOS).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Denuncio no encontrado");}
    return {message:"Denuncio eliminado correctamente"}

}