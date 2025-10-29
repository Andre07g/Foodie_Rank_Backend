import { obtenerPlatos, obtenerPlatoPorID, crearPlato, actualizarPlato, eliminarPlato} from "../services/platos_services";

export async function obtenerTodosLosPlatos(req, res) {
    try {
        const games = await obtenerPlatos();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({error: "Error al obtener todos los platos"});
    }
}

export async function obtenerUnPlato(req, res) {
    try {
        const id = req.params.id;
        const game = await obtenerPlatoPorID(id);
        if(!game) return res.status(404).json({error: "Plato no encontrado"});
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({error: "Error al obtener el plato"});
    }
}

export async function crearUnPlato(req, res) {
    try {
        const result = await crearPlato(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function actualizarUnPlato(req, res) {
    try {
        const id = req.params.id;
        const result = await actualizarPlato(id, req.body);
        res.status(202).json(result);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export async function eliminarUnPlato(req, res) {
    try {
        const id = req.params.id;
        const result = await eliminarPlato(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}