import { obtenerDenuncios, obtenerDenuncioPorID, crearDenuncio, actualizarDenuncio, eliminarDenuncio } from "../services/denuncios_services.js";

export async function obtenerTodosLosDenuncios(req, res) {
    try {
        const games = await obtenerDenuncios();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todos los denuncios"});
    }
}

export async function obtenerUnDenuncioPorID(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerDenuncioPorID(id);
        if(!game) return res.status(404).json({error: "Denuncio no encontrado"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener denuncio"});
    }
}

export async function crearUnDenuncio(req, res) {
    try {
        const result = await crearDenuncio(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnDenuncio(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarDenuncio(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnDenuncio(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarDenuncio(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}