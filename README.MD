# Proyecto final Talento Tech NodeJs Comisión 23134 2026

**Descripción:** API REST para CRUD de productos con simulación de sistema de autenticación mediate tokens.

## Tecnologías utilizadas:

* **NodeJS**
* **Express**
* **JWT**
* **Google Firestore** como base de datos NOSQL

## RUTAS:

- **GET** `/` Health check.

### Productos

- **GET** `/api/productos` Obtener listado de productos.

- **GET** `/api/productos/:id` Obtener un producto por id.

- **POST** `/api/productos` Crear un producto.

- **PUT** `/api/productos/:id` Actualizar un producto.

- **DELETE** `/api/productos/:id` Eliminar un producto.

### Autenticación

- **POST** `/api/auth/login` Iniciar sesión con las siguientes credenciales:

```json
{
    "email": "user@email.com",
    "password": "strongPass123"
}
```



