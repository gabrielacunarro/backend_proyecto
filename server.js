import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { socketUtils } from "./src/utils/socket.utils.js";
import realViewRouter from "./src/routers/views/real.view.js";
import registerViewRouter from './src/routers/views/register.view.js';
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import dbConnection from "./src/utils/db.js";

const server = express();
const PORT = process.env.PORT || 8080;
const ready = () =>
    console.log("Server on port " + PORT);
dbConnection()
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

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

export { socketServer };









