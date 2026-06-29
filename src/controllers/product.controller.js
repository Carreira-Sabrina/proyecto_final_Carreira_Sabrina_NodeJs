import * as ModeloProductos from "../models/product.model.js"


// ***********************************************************************************************
// 📝NOTA: TODAS LAS FUNCIONES PARA CONECTAR CON FIREBASE DEBEN SER ASINCRONAS
//          ANTES DE ENTRAR AL TRY CATCH, SI VIENE ALGO EN EL REQUEST HAY QUE VALIDARLO

// ***********************************************************************************************

export async function obtenerListadoProductos(req,res){
    try {
        const productos = await ModeloProductos.listarProductos()

        res.status(200).json(productos)

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({mensaje: "Error del servidor al intentar listar los productos"})
    }
}


export async function obtenerProductoPorId(req, res){

    const {id} = req.params;

    try {
        const producto = await ModeloProductos.obtenerProductoPorId(id);

        if (!producto){
            return res.status(404).json({message: `Producto con id ${id} no encontrado ⛔`})
        }

        res.status(200).json(producto)

    } catch (error) {
        console.error("Error al intentar buscar el producto");
        return res.status(500).json({mensaje: "Error del servidor"})
    } 
}


export async function crearProducto(req, res){
    //Parsear cuerpo peticion
    let {nombre, precio, descripcion, categorias,stock, urlImagen} = req.body;
    //De minima habria que pedir nombre y precio
    if(!nombre || !precio){
        return res.status(400).json({mensaje: "Se necesitan al menos un nombre y un precio para crear un producto"})
    }
    if(!stock){
        stock = 0;
    }

    //VALIDACIÓN DEL CUERPO DE LA PETICIÓN
    let productoParaGuardar ={
            nombre: nombre,
            precio: precio,
            stock: stock
        }
    
        //SE NULLEA TODO LO QUE VENGA UNDEFINED!
        descripcion !== undefined  ? productoParaGuardar.descripcion = descripcion
                                                : productoParaGuardar.descripcion = null
    
        categorias !== undefined  ? productoParaGuardar.categorias = categorias
                                                : productoParaGuardar.categorias = null
    
        urlImagen !== undefined  ? productoParaGuardar.urlImagen = urlImagen
                                                : productoParaGuardar.urlImagen = null


    const nuevoProducto = await ModeloProductos.crearProducto(productoParaGuardar);
    res.status(200).json({nuevoProducto})
}

export async function actualizarProducto(req, res){
    const {id} = req.params;
    if(!id){
        return res.status(400).json({mensaje: "Id del producto a actualizar requerido"})
    }

    const datosParaActualizar = {}

    //Validaciones
    if(req.body.nombre !== undefined){
        datosParaActualizar.nombre = req.body.nombre;
    }
    if(req.body.precio !== undefined){
        datosParaActualizar.precio = req.body.precio;
    }
    if(req.body.descripcion !== undefined){
        datosParaActualizar.descripcion = req.body.descripcion;
    }
    if(req.body.stock !== undefined){
        datosParaActualizar.stock = req.body.stock;
    }
    if(req.body.categorias !== undefined){
        datosParaActualizar.categorias = req.body.categorias;
    }
    if(req.body.urlImagen !== undefined){
        datosParaActualizar.urlImagen = req.body.urlImagen;
    }

    try {
            const actualizado = await ModeloProductos.actualizarProducto(id, datosParaActualizar)

            if(!actualizado){
                return res.status(400).json({mensaje: "Algo salió mal en la actualización, revisa los campos ingresados"})
            }
            return res.status(200).json({mensaje: "Producto actualizado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Error del servidor"})
    }    
}

export async function eliminarProducto(req,res){
    const {id} = req.params;
    if(!id){
        return res.status(400).json({mensaje: "Id del producto a actualizar requerido"})
    }
    try {
        const hayProductoParaBorrar = ModeloProductos.eliminarProducto(id);
        if (hayProductoParaBorrar){
            return res.status(200).json({mensaje: `Producto con id ${id} eliminado correctamente`})
        }else{
            return res.status(404).json({mensaje: `Producto con id ${id} no existe`})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: "Error del servidor eliminando producto"})
    }
}