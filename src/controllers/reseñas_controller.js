import { obtenerReseñas, obtenerReseñaPorID, crearReseña, actualizarReseña, eliminarReseña, obtenerReseñasPorUsuario } from "../services/reseñas_service.js";

export async function obtenerTodasLasReseñas(req, res) {
    try {
        const games = await obtenerReseñas();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todas las reseñas"});
    }
}

export async function obtenerUnaReseñaPorID(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerReseñaPorID(id);
        if(!game) return res.status(404).json({error: "Reseña no encontrada"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener la reseña"});
    }
}

export async function obtenerUnaReseñaPorIDCliente(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerReseñasPorUsuario(id);
        if(!game) return res.status(404).json({error: "Reseñas no encontradas"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener las reseñas"});
    }
}

export async function crearUnaReseña(req, res) {
    try {
        const result = await crearReseña(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function notificarReseña(req, res) {
    try {
        const id = req.params.id;
        const result = await obtenerReseñasPorUsuario(id);
        res.status(200).json({"notificacion":"Una nueva reseña ha sido creada"})
        console.log("Nueva reseña")
    } catch (error) {
        res.status(500).json({error: "No se encontraron nuevas reseñas"})
    }
}

export async function actualizarUnaReseña(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarReseña(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function marcarNotificacion(req, res) {
    try {
        const vista = await crearReseña(req.body);
        res.status(200).json(vista)
    } catch (error) {
       res.status(400).json({error: "No se encontraron nuevas reseñas"})
    }
}

export async function eliminarUnaReseña(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarReseña(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}