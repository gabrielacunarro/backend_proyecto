# Backend Proyecto

## Estructura del Proyecto

- **data:** Carpeta que almacena los archivos JSON para productos, usuarios y órdenes.
- **assets:** Carpeta que contiene imágenes relacionadas con productos, usuarios y órdenes.
- **managers:**
  - **product.js:** Archivo que define la clase `ProductManager` para gestionar productos.
  - **user.js:** Archivo que define la clase `UserManager` para gestionar usuarios.
  - **order.js:** Archivo que define la clase `OrderManager` para gestionar órdenes.
  - **mongo.manager.js:** Archivo que define la clase MongoManager para gestionar operaciones en la base de datos MongoDB.

- **utils.js:** Archivo que contiene funciones y utilidades compartidas en todo el proyecto.
- **middlewares:** Carpeta que almacena funciones de middleware para el servidor.

- **server.js:** Archivo principal que inicia el servidor.
- **routers:** Carpeta que contiene módulos de enrutamiento para diferentes recursos (productos, usuarios, órdenes, etc.).

## Endpoints

### Productos
- `GET /productos`: Obtener la lista de productos.
- `GET /productos/:id`: Obtener un producto por ID.
- `POST /productos`: Crear un nuevo producto.
- `PUT /productos/:id`: Actualizar un producto existente.
- `DELETE /productos/:id`: Eliminar un producto.

### Usuarios
- `GET /usuarios`: Obtener la lista de usuarios.
- `GET /usuarios/:id`: Obtener un usuario por ID.
- `POST /usuarios`: Crear un nuevo usuario.
- `PUT /usuarios/:id`: Actualizar un usuario existente.
- `DELETE /usuarios/:id`: Eliminar un usuario.
- **GET /usuarios/readbyemail/:email:** Obtener un usuario por email.

### Órdenes
- `GET /ordenes`: Obtener la lista de órdenes.
- `GET /ordenes/:uid`: Obtener una orden por ID del usuario.
- `POST /ordenes`: Crear una nueva orden.
- `PUT /ordenes/:id`: Actualizar una orden existente.
- `DELETE /ordenes/:id`: Eliminar una orden.

## MongoDB

- **db.js:** Archivo que contiene la configuración y conexión a la base de datos MongoDB.

- **managers:**
  - **mongo.manager.js:** Archivo que define la clase MongoManager para gestionar operaciones en la base de datos MongoDB.

