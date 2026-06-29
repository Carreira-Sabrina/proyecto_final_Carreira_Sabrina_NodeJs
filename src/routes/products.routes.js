import { Router } from "express";
import * as ControladorProductos from "../controllers/product.controller.js"
import { protegerRuta } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/",protegerRuta, ControladorProductos.obtenerListadoProductos);

router.get("/:id", ControladorProductos.obtenerProductoPorId);

router.post("/", ControladorProductos.crearProducto);

router.put("/:id", ControladorProductos.actualizarProducto)

router.delete("/:id", ControladorProductos.eliminarProducto)



export default router;