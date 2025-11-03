import { obtenerBD } from "../config/db.js";
import { ObjectId, Double } from "mongodb";
const COLECCION_RESEÑAS = "reseñas"
const COLECCION_USUARIOS = "usuarios"
const COLECCION_RESTAURANTES = "restaurantes"

export async function obtenerReseñas(){
    const db = await obtenerBD()
    const reseñas = await db
    .collection(COLECCION_RESEÑAS)
    .aggregate([
      {
        $lookup: {
          from: COLECCION_USUARIOS,     // Colección de usuarios
          localField: "usuario",        // Campo en reseñas
          foreignField: "_id",          // Campo en usuarios
          as: "usuario_info"            // Resultado embebido
        }
      },
      {
        $unwind: {
          path: "$usuario_info",
          preserveNullAndEmptyArrays: true // por si algún usuario fue eliminado
        }
      },
      {
        $lookup: {
          from: COLECCION_RESTAURANTES,     // Colección de usuarios
          localField: "restaurante",        // Campo en reseñas
          foreignField: "_id",          // Campo en usuarios
          as: "restaurante_info"            // Resultado embebido
        }
      },
      {
        $project: {
          _id: 1,
          restaurante: 1,
          calificacion: 1,
          comentario: 1,
          likes: 1,
          dislikes: 1,
          "usuario_info._id": 1,
          "usuario_info.nombre": 1,
          "usuario_info.correo": 1,
          "restaurante_info._id:":1,
          "restaurante_info.nombre":1
        }
      }
    ])
    .toArray();

  return reseñas;
}

export async function obtenerReseñaPorID(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESEÑAS).find({usuario:new ObjectId(id)}).toArray();
    return result;
}

export async function crearReseña(data){
    const {usuario, restaurante, calificacion, comentario} = data;
    const usuarioID = new ObjectId(usuario);
    const restauranteID = new ObjectId(restaurante);
    const calificacionNum = new Double(calificacion)
    const Reseña = {usuario: usuarioID, restaurante:restauranteID, calificacion:calificacionNum, comentario, likes:[], dislikes:[]}
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