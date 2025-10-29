import { obtenerCategorias, actualizarCategoria, eliminarCategoria, crearCategoria } from "../services/categorias_services.js";

export async function obtenerTodasLasCategorias(req, res) {
    try {
        const games = await obtenerCategorias();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todas las categorias"});
    }
}

export async function crearUnaCategoria(req, res) {
    try {
        const result = await crearCategoria(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnaCategoria(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarCategoria(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnaCategoria(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarCategoria(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}