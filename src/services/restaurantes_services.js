import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_RESTAURANTES = "restaurantes"



export async function obtenerRestaurantes(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_RESTAURANTES).find().toArray();

}

export async function obtenerRestaurantePorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_RESTAURANTES).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearRestaurante(data){
    const {nombre, ubicacion, imagen, popularidad, categoria} = data;

    const Restaurante = {nombre, ubicacion, imagen, popularidad, categoria}
    const db = await obtenerBD()
    await db.collection(COLECCION_RESTAURANTES).insertOne(Restaurante);
    return {message:"El Restaurante fue creado correctamente"};
}

export async function actualizarRestaurante(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESTAURANTES).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Restaurante no encontrado");}
    return {message: "Restaurante modificado correctamente"};
}

export async function eliminarRestaurante(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESTAURANTES).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Restaurante no encontrado");}
    return {message:"Restaurante eliminado correctamente"}

}