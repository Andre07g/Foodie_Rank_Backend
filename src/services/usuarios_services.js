import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
const COLECCION_USUARIOS = "usuarios"



export async function obtenerUsuarios(){
    const db = await obtenerBD()
    return await db.collection(COLECCION_USUARIOS).find().toArray();

}

export async function obtenerUsuarioPorID(id){
    const db = await getDB()
    const result = await db.collection(COLECCION_USUARIOS).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearUsuario(data){
    const {nombre, correo, contraseña, rol, estado} = data;

    const usuario = {nombre, correo, contraseña, rol, estado}
    const db = await obtenerBD()
    await db.collection(COLECCION_USUARIOS).insertOne(usuario);
    return {message:"El usuario fue creado correctamente"};
}

export async function actualizarUsuario(id,data) {
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_USUARIOS).updateOne({_id:new ObjectId(id)},{$set:data});
    if(result.matchedCount===0){throw new Error("Usuario no encontrado");}
    return {message: "Usuario modificado correctamente"};
}

export async function eliminarUsuario(id){
    const db = await obtenerBD()
    const result = await db.collection(COLECCION_USUARIOS).deleteOne({_id:new ObjectId(id)});
    if(result.deletedCount===0){throw new Error("Usuario no encontrado");}
    return {message:"Usuario eliminado correctamente"}

}