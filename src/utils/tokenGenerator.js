import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export function generarToken(datosUsuario){
    const payload = {
        id: datosUsuario.id,
        email: datosUsuario.email
    }

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
}