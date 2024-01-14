import express from "express";
import { createServer } from "http"
import { Server } from "socket.io"
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars"
import productsManager from "./src/data/fs/productFS.js"

import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);
//server.listen(PORT, ready);
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready)
socketServer.on("connection", (socket) => {
    console.log(socket.id)
    socket.emit("welcome", "Welcome to Essence Selecto")
    socket.on("new product", async (data) => {
        try {
            console.log(data)
            await productsManager.create(data)
            socket.emit("new success", "Well done!")
        } catch (error) {
            console.log(error)

        }
    })
})

//templates

server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

// Middleware para procesar los datos
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"))

//routers
server.use('/', router);
server.use(errorHandler);
server.use(pathHandler) // siempre a lo ultimo






































