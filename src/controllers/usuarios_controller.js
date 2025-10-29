import { obtenerUsuarioPorID, obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, validarEmail, login } from "../services/usuarios_services.js";

export async function obtenerTodosLosUsuarios(req, res) {
    try {
        const games = await obtenerUsuarios();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todos los usuarios"});
    }
}

export async function obtenerUnUsuarioPorID(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerUsuarioPorID(id);
        if(!game) return res.status(404).json({error: "Usuario no encontrado"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener el usuario"});
    }
}

export async function crearUnUsuario(req, res) {
    try {
        const result = await crearUsuario(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnUsuario(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarUsuario(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnUsuario(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarUsuario(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

export async function validarExistenciaDeEmail(req, res){
    try {
        const result = await validarEmail(req.body);
        res.status(201).json(result);
        // aplicar logica para el registro 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function login(req, res){
    try {
        const result = await login(req.body);
        res.status(201).json(result);
        // nuevamente aplicar mas logica pq no e tudiao jwt
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}