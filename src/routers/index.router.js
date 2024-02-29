import { Router } from "express";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.view.js";
import ordersRouter from "./api/orders.router.js";

const router = Router()

router.use("/api", apiRouter)
router.use("/", viewsRouter)
router.use("/orders", ordersRouter)

export default router