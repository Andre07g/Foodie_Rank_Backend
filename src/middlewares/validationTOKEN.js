import jwt from "jsonwebtoken";

export function verificarToken(req, res, next){
    const header=req.headers["authorization"];
    if (!header){
        return res.status(401).json({mensaje:"Token no proporcionado"})
    }
    const token=header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario=decoded;
        next();
    } catch (error) {
        res.status(403).json({mensaje:"Token invalido o expirado"});
    }
}

