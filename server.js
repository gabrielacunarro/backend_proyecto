import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import productsManager from "./src/data/fs/productFS.js";
import usersManager from "./src/data/fs/userFS.js";
import realViewRouter from "./src/routers/views/real.view.js";
import registerViewRouter from './src/routers/views/register.view.js';

import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);


async function emitProducts(socket) {
    try {

        const products = await productsManager.read();

        socket.emit("products", products);
    } catch (error) {
        console.error('Error al leer la lista de productos:', error);
    }
}

socketServer.on("connection", (socket) => {
    console.log(socket.id);

    // Emitir la lista de productos al cliente cuando se conecta
    emitProducts(socket);

    socket.on("new product", async (data) => {
        try {
            console.log(data);
            await productsManager.create(data);
            socket.emit("new success", "Product added successfully!");

            // Después de crear un nuevo producto, volvemos a emitir la lista actualizada
            emitProducts(socket);
        } catch (error) {
            console.log(error);
        }
    });
});


//register de usuarios
async function emitUsers(socket) {
    try {

        const users = await usersManager.read();

        socket.emit("users", users);
    } catch (error) {
        console.error('Error al leer la lista de usuarios:', error);
    }
}

socketServer.on("connection", (socket) => {
    console.log(socket.id);

    // Emitir la lista de users 
    emitUsers(socket);

    socket.on("new user", async (data) => {
        try {
            console.log(data);
            await usersManager.create(data);
            socket.emit("new success", "User registered successfully!");

            // Después de crear un nuevo user, volvemos a emitir la lista actualizada
            emitUsers(socket);
        } catch (error) {
            console.log(error);
        }
    });
});

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Agrega la ruta del enrutador 
server.use(realViewRouter);
server.use(registerViewRouter);

// Middleware para procesar los datos
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//routers
server.use('/', router);
server.use(errorHandler);
server.use(pathHandler); // siempre a lo ultimo







































