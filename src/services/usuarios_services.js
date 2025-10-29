import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const hashPassword = async (password) => {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

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
    const {nombre, correo, contraseña, rol} = data;
    const contraseñaHasheada = await hashPassword(contraseña);
    console.log(contraseñaHasheada);
    console.log(contraseñaHasheada.length)
    const usuario = {nombre, correo, contraseña:contraseñaHasheada, rol, estado:"Activo"}
    const db = await obtenerBD();
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

export async function validarEmail(emailUser){
    const db= await obtenerBD();
    const result = await db.collection(COLECCION_USUARIOS).findOne({email:emailUser})
    if(result.matchedCount===0){
        return false;
    }
    else{ return true;}
}

export async function login(emailUser,contraseniaUser){
    const db=await obtenerBD();
    const result = await db.collection(COLECCION_USUARIOS).findOne({email:emailUser});
    const resultado = await bcrypt.compare(contraseniaUser,result.contraseña);
    return resultado;
}