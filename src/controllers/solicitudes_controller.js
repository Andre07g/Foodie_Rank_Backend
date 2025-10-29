import { obtenerSolicitudes, obtenerSolicitudPorID, crearSolicitud, actualizarSolicitud, eliminarSolicitud } from "../services/solicitudes_services";

export async function obtenerTodasLasSolicitudes(req, res) {
    try {
        const games = await obtenerSolicitudes();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todas las solicitudes"});
    }
}

export async function obtenerUnaSolicitudPorID(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerSolicitudPorID(id);
        if(!game) return res.status(404).json({error: "Solicitud no encontrada"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener la solicitud"});
    }
}

export async function crearUnaSolicitud(req, res) {
    try {
        const result = await crearSolicitud(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnaSolicitud(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarSolicitud(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnaSolicitud(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarSolicitud(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}