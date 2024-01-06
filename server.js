// server.js
import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/data/middlewares/errorHandler.mid.js";
import pathHandler from "./src/data/middlewares/pathHandler.mid.js";


const server = express();

const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);

// Middleware para procesar los datos
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/',router);
server.use(errorHandler);
server.use(pathHandler) // siempre a lo ultimo

// Inicio el servidor
server.listen(PORT, ready);




































