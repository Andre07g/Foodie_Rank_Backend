export function verificarAdmin(req,res,next){
    if(req.usuario.rol!=="Admin"){
        return res.status(403).json({mensaje:"No eres admin, acceso denegado"})
    }
    next();
}