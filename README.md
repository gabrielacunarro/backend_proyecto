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
- `GET /usuarios/readbyemail/:email:` Obtener un usuario por email.

### Órdenes
- `GET /ordenes`: Obtener la lista de órdenes.
- `GET /ordenes/:uid`: Obtener una orden por ID del usuario.
- `POST /ordenes`: Crear una nueva orden.
- `PUT /ordenes/:id`: Actualizar una orden existente.
- `DELETE /ordenes/:id`: Eliminar una orden.
- `GET /orders/total` Obtener el monto total por usuario.

## MongoDB

- **db.js:** Archivo que contiene la configuración y conexión a la base de datos MongoDB.

- **managers:**
  - **mongo.manager.js:** Archivo que define la clase MongoManager para gestionar operaciones en la base de datos MongoDB.

  ## Paginación y Filtros

La aplicación cuenta con un sistema de paginación y filtros que permite a los usuarios gestionar grandes conjuntos de datos de manera eficiente. Las principales características incluyen:

- **Paginación**: Los resultados se dividen en páginas para facilitar la navegación y mejorar la experiencia del usuario. Esto es especialmente útil cuando se manejan grandes cantidades de información, como en listas de productos o resultados de búsqueda.

- **Filtros**: Los usuarios pueden refinar sus búsquedas utilizando filtros específicos, lo que les permite encontrar rápidamente la información deseada. Los filtros pueden ser aplicados en diferentes criterios.

Estas funcionalidades proporcionan una experiencia de usuario más fluida y eficiente, permitiendo a los usuarios explorar y encontrar fácilmente la información que están buscando.

## Gestión de Sesiones y Validación de Credenciales

- **Gestión de Sesiones**: Se utilizan sesiones de usuario para mantener la autenticación entre solicitudes. Esto se logra mediante el uso de paquetes como `express-session`.

- **Vistas de Inicio de Sesión**: Se han implementado vistas con handlebars para el login del usuario

- **Validación de Credenciales**: Se proporcionan funciones de validación de credenciales como `has8char` e `isValidPass` en el archivo `utils.js`. Estas funciones aseguran que las contraseñas cumplan con los requisitos mínimos de seguridad antes de ser almacenadas en la base de datos.

## Mejoras añadidas:

- **Compresión de Datos**:
-La aplicación utiliza técnicas de compresión como Gzip y Brotli para optimizar el rendimiento al reducir el tamaño de los datos transferidos entre el servidor y el cliente. Esto mejora la velocidad de carga de la aplicación y reduce el consumo de ancho de banda.

- **Mejora del Error Handler**:
-Se ha mejorado el manejo de errores en la aplicación para proporcionar mensajes de error más descriptivos y útiles al usuario. Esto ayuda a identificar y solucionar problemas de manera más eficiente, mejorando la experiencia del usuario.

- **Diccionario de errores**:
-Error 400: Error - Se produce cuando ocurre un error genérico en la aplicación.
-Error 401: Bad auth - Se produce cuando la autenticación del usuario falla debido a credenciales incorrectas.
-Error 403: Forbidden - Se produce cuando el cliente intenta acceder a un recurso para el cual no tiene permisos suficientes.
-Error 404: Not Found - Se produce cuando se intenta acceder a un recurso que no existe en el servidor.
-Error 500: Fatal - Se produce cuando ocurre un error interno en el servidor que impide completar la solicitud del cliente.

- **Mocks**:
-Se han incorporado mocks para simular el comportamiento de componentes externos o dependencias durante las pruebas unitarias. Esto permite probar el código de manera aislada y garantizar su funcionamiento correcto en diferentes escenarios.