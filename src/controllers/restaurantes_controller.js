import { obtenerRestaurantes, obtenerRestaurantePorID, crearRestaurante, actualizarRestaurante, eliminarRestaurante, obtenerRestaurantePorUser, añadirResFav, eliminarResFav } from "../services/restaurantes_services.js";

export async function obtenerTodosLosRestaurantes(req, res) {
    try {
        const games = await obtenerRestaurantes();
        res.status(200).json(games);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "Error al obtener todos los restaurantes"});
    }
}

export async function obtenerUnRestaurantePorID(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerRestaurantePorID(id);
        if(!game) return res.status(404).json({error: "Restaurante no encontrado"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener el restaurante"});
    }
}

export async function obtenerUnRestaurantePorUsuario(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerRestaurantePorUser(id);
        if(!game) return res.status(404).json({error: "Restaurante no encontrado"});
        res.status(200).json(game)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error al obtener el restaurante"});
    }
}

export async function crearUnRestaurante(req, res) {
    try {
        const result = await crearRestaurante(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnRestaurante(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarRestaurante(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnRestaurante(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarRestaurante(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

export async function añadirRestauranteFavorito(req, res) {
    try {
        const idRes = req.body.idRes;
        const idUsuario = req.body.idUsuario;
        const resultado = await añadirResFav(idRes, idUsuario)
        res.status(200).json({"mensaje":"Se añadio el restaurante correctamente a favoritos"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function eliminarRestauranteFavorito(req, res) {
    try {
        const idRes = req.body.idRes;
        const idUsuario = req.body.idUsuario;
        const resultado = await eliminarResFav(idRes, idUsuario)
        console.log(resultado)
        res.status(200).json({"mensaje":"Se eliminó el restaurante correctamente de favoritos"})
    } catch (error) {
        res.status(500).json(error.message)
        console.log(error)
    }
}