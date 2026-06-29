import express from "express";
import { notFound } from "./middlewares/notFound.js";
import routerProductos from "../src/routes/products.routes.js"
import routerAuth from "../src/routes/auth.routes.js"
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;



// **************** MIDDLEWARE ****************
app.use(express.json());
app.use(cors())

// **************** HEALTH CHECK ****************
app.get("/", (req, res)=>{
    res.status(200).json({message: "TODO FUNCIONANDO CORRECTAMENTE 🌈"})
})


// **************** ROUTER PRODUCTOS ****************
app.use("/api/productos", routerProductos)

// **************** ROUTER AUTH ****************
app.use("/api/auth", routerAuth)

// **************** NOT FOUND MIDDLEWARE ****************
app.use(notFound)


// **************** SERVER ****************
app.listen(PORT, ()=>{
    console.log(`APP CORRIENDO EN EL PUERTO ${PORT}`)
})
