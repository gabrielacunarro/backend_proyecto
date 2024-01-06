import {Router} from "express";
import apiRouter from "./api/index.router.js";

const router = Router();

//implementar el router de api y de vistas
router.use("/api",apiRouter)

export default router