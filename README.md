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

- **Logger**:

Se ha integrado un sistema de logging en el proyecto para registrar eventos importantes y errores. El logger utiliza la biblioteca Winston, que proporciona flexibilidad y opciones de configuración avanzadas. Además, el sistema de loggin se ha configurado de manera dinámica para adaptarse al entorno de ejecución.

- **Gestión de Roles y Permisos**:
Se ha establecido un nuevo rol para el schema del usuario llamado "premium" (role=2), el cual estará habilitado también para gestionar sus productos.
Se ha modificado el schema de producto para contar con un campo "owner_id", el cual hará referencia al id de la persona que creó el producto (admin o premium).
Se han modificado los permisos para que:
Un usuario premium solo pueda actualizar/borrar los productos que le pertenecen.
El admin pueda actualizar/borrar cualquier producto, aún si es de otro owner.
Se ha implementado una nueva ruta en el router de api/users, la cual permitirá cambiar el rol de un usuario, de "user" (cero) a "premium" (dos) y viceversa.
Se ha modificado la lógica para leer productos para que un usuario premium NO pueda ver sus productos en la tienda.

## Mejoras añadidas:

## Pruebas con Supertest, Mocha, y Chai
Se han agregado pruebas unitarias utilizando Supertest, Mocha y Chai para verificar la funcionalidad de los endpoints de la API.
Las pruebas cubren la autenticación de usuarios, la creación, lectura, actualización y eliminación de productos y usuarios, así como la gestión de sesiones y la validación de credenciales.
Se han implementado aserciones para garantizar que los endpoints respondan correctamente con los códigos de estado esperados y los datos adecuados.
Se han manejado problemas de sincronización y asincronía para asegurar que las pruebas se ejecuten de manera adecuada.

## Pruebas de Estrés con Artillery
Se han añadido pruebas de estrés utilizando Artillery para evaluar el rendimiento del sistema bajo carga.
Las pruebas de estrés incluyen escenarios como el inicio de sesión, la lectura de productos y la finalización de la sesión.
Estas pruebas ayudan a identificar posibles cuellos de botella y a optimizar el rendimiento del sistema para manejar un gran volumen de usuarios concurrentes.
Con estas mejoras, el proyecto ha ganado en seguridad, funcionalidad y rendimiento, proporcionando una experiencia de usuario más robusta y satisfactoria.