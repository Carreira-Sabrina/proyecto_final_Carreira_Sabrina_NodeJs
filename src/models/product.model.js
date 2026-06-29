import { collection, addDoc,getDoc, getDocs,deleteDoc,doc, updateDoc } from "firebase/firestore"

import {db} from "../firebaseConfig.js"


//Referencia a la colección

const PRODUCTS_COLLECTION = collection(db, "productos");


// ESTUCTURA DE UN PRODUCTO: nombre=>string, precio=>double, descripcion=> string, categorias=> array of strings, urlImagen=>string
//                           stock=>int64

//Referencia a la colección de productos en Firestore
const COLECCION_PRODUCTOS = collection(db, "productos")


export async function listarProductos(){
    try {
        const snapshot =await getDocs(COLECCION_PRODUCTOS);
        const listaProductos = snapshot.docs.map(doc=>(
            {id: doc.id, ...doc.data()}
        ))

        return listaProductos;

    } catch (error) {
        console.error(error.message);
    }
}

export async function obtenerProductoPorId(id){
    try {
        const docRef = doc(COLECCION_PRODUCTOS, id);
        const snapshot = await getDoc(docRef);
        return snapshot.exists()    ?  {id: snapshot.id, ...snapshot.data()}
                                    :  null

    } catch (error) {
        console.error(error.message);
        console.log(`Error al obtener producto con id ${id}`)
    }
}

export async function crearProducto(dataProducto){
    try {
        const docRef = await addDoc(COLECCION_PRODUCTOS,dataProducto);
        return {id: docRef.id, ...dataProducto}
    } catch (error) {
        console.error(error.message);
    }
}

export async function actualizarProducto(id, datosProducto){
    try {
         //Buscar si existe el producto a actualizar.
        const productRef = doc(PRODUCTS_COLLECTION, id);
        const snapshot = await getDoc(productRef);
        if(!snapshot.exists()){
            return false;
        }
        await updateDoc(productRef, datosProducto)
        return true
    } catch (error) {
        console.error(error.message);
    }
}

export async function eliminarProducto(id){
    //Existe el producto a borrar?
    try {
         //Buscar si existe el producto a actualizar.
        const productRef = doc(PRODUCTS_COLLECTION, id);
        const snapshot = await getDoc(productRef);
        if(!snapshot.exists()){
            return false;
        }
        await deleteDoc(productRef)
        return true
    } catch (error) {
        console.error(error.message);
    }
}