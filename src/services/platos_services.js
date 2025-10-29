import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_PLATOS = "platos"



export async function obtenerPlatos(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_PLATOS).find().toArray();

}

export async function obtenerPlatoPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_PLATOS).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearPlato(data){
    const {nombre, precio, descripcion, imagen, restaurante} = data;

    const Plato = {nombre, precio, descripcion, imagen, restaurante}
    const db = await obtenerBD()
    await db.collection(COLECCION_PLATOS).insertOne(Plato);
    return {message:"El Plato fue creado correctamente"};
}

export async function actualizarPlato(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_PLATOS).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Plato no encontrado");}
    return {message: "Plato modificado correctamente"};
}

export async function eliminarPlato(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_PLATOS).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Plato no encontrado");}
    return {message:"Plato eliminado correctamente"}

}