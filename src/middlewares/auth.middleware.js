import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export function protegerRuta(req,res,next){
    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({mensaje: "Token inválido"});
    }
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({mensaje: "Formato de token inválido"});
    }

    //Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.error(error)
        return res.status(403).json({mensaje: "Token inválido o expirado"});
    }
}