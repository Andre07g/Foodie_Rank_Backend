import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_CATEGORIAS = "categorias"



export async function obtenerCategorias(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_CATEGORIAS).find().toArray();

}

export async function crearCategoria(data){
    const {nombre, descripcion} = data;

    const categoria = {nombre, descripcion}
    const db = await obtenerBD()
    await db.collection(COLECCION_CATEGORIAS).insertOne(categoria);
    return {message:"La categoria fue creada correctamente"};
}

export async function actualizarCategoria(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_CATEGORIAS).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Categoria no encontrada");}
    return {message: "Categoria modificada correctamente"};
}

export async function eliminarCategoria(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_CATEGORIAS).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Categoria no encontrada");}
    return {message:"Categoria eliminada correctamente"}

}