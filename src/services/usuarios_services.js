import { obtenerBD } from "../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Result } from "express-validator";
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
    const db = await obtenerDB()
    const result = await db.collection(COLECCION_USUARIOS).findOne({_id:new ObjectId(id)});
    return result;
}

export async function crearUsuario(data){
    const {nombre, correo, contraseña} = data;
    const contraseñaHasheada = await hashPassword(contraseña);
    const usuario = {nombre, correo, contraseña:contraseñaHasheada, rol:"User", estado:"Activo"}
    const db = await obtenerBD();

    // Intentar insertar
    const result = await db.collection(COLECCION_USUARIOS).insertOne(usuario);

    // Retornar el usuario creado
    return {
        exito: true,
        usuario: { _id: result.insertedId, nombre, correo, rol: "User", estado: "Activo" },
        message: "El usuario fue creado correctamente"
    };
}

export async function actualizarUsuario(id,data) {
    const db = await obtenerBD()
    if (data.contraseña){
        data.contraseña = await hashPassword(data.contraseña);
    };
    console.log(data.contraseña)
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

export async function validarEmail(data){
    const {emailUser} = data;
    console.log(emailUser)
    const db= await obtenerBD();
    const result = await db.collection(COLECCION_USUARIOS).findOne({correo:emailUser})
    console.log(result)
    if(!result){
        throw new Error("Usuario no encontrado");
        
    }
    return result
}

export async function loginPass(data){
    const db=await obtenerBD();
    const { emailUser, contraseniaUser } = data;
    const result = await db.collection(COLECCION_USUARIOS).findOne({correo:emailUser});
    const resultado = await bcrypt.compare(contraseniaUser,result.contraseña);
    return resultado;
}


