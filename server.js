import "dotenv/config.js";
import env from "./src/utils/env.util.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import options from "./src/utils/swagger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import sessionsViewRouter from './src/routers/views/sessions.view.js';
import cors from "cors"
import formViewRouter from "./src/routers/views/form.view.js";
import ordersViewRouter from "./src/routers/views/orders.view.js";
import thanksViewRouter from "./src/routers/views/thanks.view.js";
import IndexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import compression from "express-compression";
import winston from "./src/middlewares/winston.js";
import winstonUtils from "./src/utils/logger/winston.utils.js";
import cluster from "cluster";
import { cpus } from "os";


const server = express();
const PORT = env.PORT || 8080;

const specs = swaggerJSDoc(options)
server.use("/api/docs", serve, setup(specs))

const ready = () =>
    winstonUtils.INFO("Server on port " + PORT);
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
server.use(thanksViewRouter);

// Configuración de MongoStore para almacenamiento de sesiones
server.use(cookieParser(env.SECRET_KEY));
server.use(expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: env.DB_LINK,
        ttl: 7 * 24 * 60 * 60, // Tiempo de vida de la sesión en segundos (7 días)
    }),
}));

server.use(
    cors({
        origin: true,
        credentials: true,
    })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(express.static(__dirname + "/src"));
server.use(morgan("dev"));
server.use(winston);
server.use(
    compression({
        brotli: { enabled: true, zlib: {} }
    })
);

//routers
const router = new IndexRouter()
server.use('/', router.getRouter());
server.use(errorHandler);
server.use(pathHandler); // siempre a lo ultimo

export { socketServer };

const numCPUs = cpus().length;

// if (cluster.isPrimary) {
//     winston.info('primary');
//     for (let i = 1; i <= numCPUs; i++) {
//         cluster.fork()
//     }
// } else {
//     winston.info('worker', process.pid);
//     server.listen(9000,()=>
// winston.info("worker ready on port: ",9000))
// }

