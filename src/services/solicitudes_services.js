import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_SOLICITUDES = "solicitudes"
const COLECCION_RESTAURANTES = "restaurantes"

export async function obtenerSolicitudes() {
  const db = await obtenerBD();

  const solicitudes = await db.collection(COLECCION_SOLICITUDES).aggregate([
    {
      $lookup: {
        from: "usuarios",            // colección a unir
        localField: "usuario",       // campo en solicitudes
        foreignField: "_id",         // campo en usuarios
        as: "usuario"                // nombre del nuevo campo
      }
    },
    {
      $lookup: {
        from: "categorias",          // colección a unir
        localField: "categoria",     // campo en solicitudes
        foreignField: "_id",         // campo en categorias
        as: "categoria"              // nombre del nuevo campo
      }
    },
    {
      // Para que "usuario" y "categoria" sean objetos en lugar de arrays
      $unwind: { path: "$usuario", preserveNullAndEmptyArrays: true }
    },
    {
      $unwind: { path: "$categoria", preserveNullAndEmptyArrays: true }
    },
    {
      // Estructura final limpia
      $project: {
        _id: 1,
        nombre: 1,
        ubicacion: 1,
        imagen: 1,
        popularidad: 1,
        descripcion: 1,
        usuario: {
          _id: "$usuario._id",
          nombre: "$usuario.nombre",
          correo: "$usuario.correo"
        },
        categoria: {
          _id: "$categoria._id",
          nombre: "$categoria.nombre"
        }
      }
    }
  ]).toArray();

  return solicitudes;
}


export async function obtenerSolicitudPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_SOLICITUDES).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearSolicitud(data){
   
const {nombre, ubicacion, imagen,categoria,usuario,descripcion} = data;
    const categoriaID = new ObjectId(categoria)
    const usuarioID = new ObjectId(usuario)
    const Solicitud = {nombre, ubicacion, imagen, popularidad:null, categoria:categoriaID,usuario:usuarioID,descripcion}
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
export async function aceptarSolicitud(idSolicitud) {
    const db = await obtenerBD();

    try {
        // Obtener la solicitud
        const solicitud = await db.collection(COLECCION_SOLICITUDES)
            .findOne({ _id: new ObjectId(idSolicitud) });

        if (!solicitud) throw new Error("Solicitud no encontrada");

        // Crear el restaurante a partir de la solicitud
        const restaurante = {
            nombre: solicitud.nombre,
            ubicacion: solicitud.ubicacion,
            imagen: solicitud.imagen,
            categoria: solicitud.categoria,
            popularidad: solicitud.popularidad || 0,
            usuario: solicitud.usuario
        };

        // Insertar en la colección de restaurantes
        await db.collection(COLECCION_RESTAURANTES).insertOne(restaurante);

        // Eliminar la solicitud
        const resultado = await db.collection(COLECCION_SOLICITUDES)
            .deleteOne({ _id: new ObjectId(idSolicitud) });

        if (resultado.deletedCount === 0) throw new Error("No se pudo eliminar la solicitud después de aceptar");

        return { message: "Solicitud aceptada y convertida en restaurante correctamente" };

    } catch (err) {
        console.error("Error aceptando solicitud:", err);
        throw err;
    }
}