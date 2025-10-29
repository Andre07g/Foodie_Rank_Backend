import { obtenerBD } from "../config/db.js";
import { ObjectId, Double } from "mongodb";
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
    const {nombre, ubicacion, imagen,categoria} = data;
    const categoriaID = new ObjectId(categoria)
    const Restaurante = {nombre, ubicacion, imagen, popularidad:null, categoria:categoriaID}
    const db = await obtenerBD()
    await db.collection(COLECCION_RESTAURANTES).insertOne(Restaurante);
    return {message:"El Restaurante fue creado correctamente"};
}

export async function actualizarRestaurante(id, data){
    const updateData = {};
    if(data.popularidad !== undefined){
        const pop = Number(data.popularidad);
        if(isNaN(pop) || pop < 1 || pop > 5) throw new Error("Popularidad inválida");
        updateData.popularidad = new Double(pop);
    }
    if(data.categoria !== undefined){
        if(!/^[0-9a-fA-F]{24}$/.test(data.categoria)) throw new Error("ID de categoría inválido");
        updateData.categoria = new ObjectId(data.categoria);
    }
    if(data.nombre) updateData.nombre = data.nombre;
    if(data.ubicacion) updateData.ubicacion = data.ubicacion;
    if(data.imagen) updateData.imagen = data.imagen;

    const db = await obtenerBD();
    const result = await db.collection(COLECCION_RESTAURANTES).updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
    if(result.matchedCount === 0) throw new Error("Restaurante no encontrado");
    return { message: "Restaurante modificado correctamente" };
}

export async function eliminarRestaurante(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESTAURANTES).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Restaurante no encontrado");}
    return {message:"Restaurante eliminado correctamente"}

}