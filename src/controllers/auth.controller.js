import { generarToken } from "../utils/tokenGenerator.js";


const defaultUser ={
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
}

export function login(req, res){
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({mensaje: "Ingresa email y contraseña para ingresar al sistema"})
    }

    //Validación de mentirita
    if(email !== defaultUser.email || password !== defaultUser.password){
        return res.status(401).json({mensaje: "Credenciales inválidas"});
    }

    //No puedo enviar todos los datos como payload! por seguridad se envía sólo id y el email
    const usuario = {id: defaultUser.id, email: email}

    //El usuario es válido, generar token
    const token = generarToken(usuario);
    res.status(200).json(token)
}