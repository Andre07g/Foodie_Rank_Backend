import { obtenerBD } from "../config/db.js";
import { ObjectId, Double } from "mongodb";
const COLECCION_RESTAURANTES = "restaurantes"
const COLECCION_CATEGORIAS = "categorias"


export async function obtenerRestaurantes(){
    const db = await obtenerBD();
  
    const restaurantes = await db
    .collection(COLECCION_RESTAURANTES)
    .aggregate([
      {
        $lookup: {
          from: COLECCION_CATEGORIAS,
          let: { categoriaId: "$categoria" }, // variable local
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$categoriaId"] } } },
            { $project: { nombre: 1, descripcion: 1 } }
          ],
          as: "categoria_info"
        }
      },
      { $unwind: { path: "$categoria_info", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          nombre: 1,
          ubicacion: 1,
          imagen: 1,
          popularidad: 1,
          descripcion: 1,
          "categoria_info.nombre": 1,
          "categoria_info.descripcion": 1
        }
      }
    ])
    .toArray();

  return restaurantes;
  }


export async function obtenerRestaurantePorID(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESTAURANTES).findOne({_id:new ObjectId(id)});
    return result;
}

export async function obtenerRestaurantePorUser(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_RESTAURANTES).find({usuario:new ObjectId(id)}).toArray();
    return result;
}

export async function crearRestaurante(data){
    const {nombre, ubicacion, imagen,categoria, usuario} = data;
    const categoriaID = new ObjectId(categoria)
    const Restaurante = {nombre, ubicacion, imagen, popularidad:null, categoria:categoriaID, usuario}
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