import "dotenv/config.js";
import env from "./src/utils/env.util.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import sessionFileStore from "session-file-store"
import MongoStore from "connect-mongo";
import sessionsViewRouter from './src/routers/views/sessions.view.js';
import cors from "cors"
import formViewRouter from "./src/routers/views/form.view.js";
import ordersViewRouter from "./src/routers/views/orders.view.js";
import IndexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";


const server = express();
const PORT = env.PORT || 8080;
const ready = () =>
    console.log("Server on port " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Agrega la ruta del enrutador 
server.use(formViewRouter);
server.use(sessionsViewRouter);
server.use(ordersViewRouter);

const FileStore = sessionFileStore(expressSession)

server.use(cookieParser(env.SECRET_KEY));
//MEMORY STORE
server.use(
    expressSession({
        secret: env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge:60000},
    })
)

// FILE STORE
server.use(expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path:"./src/data/fs/files/sessions",
        ttl:10000,
        retries: 2
    }),
}))

//MONGO STORAGE
server.use(expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        ttl: 7 * 24 * 60 * 60, // por siete dias
        mongoUrl: env.DB_LINK
    })
}))

server.use(
    cors({
        origin: true,
        credentials: true,
    }))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//routers
const router = new IndexRouter()
server.use('/', router.getRouter());
server.use(errorHandler);
server.use(pathHandler); // siempre a lo ultimo

export { socketServer };









