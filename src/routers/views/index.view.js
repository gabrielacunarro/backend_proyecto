import { Router } from "express";

import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js"

const viewsRouter = Router()

viewsRouter.get("/", (req,res,next)=>{
    try {
        const mainEvents = ["PERFUME", "PERFUME", "PERFUME"]
        const date = new Date();
        return res.render('layouts/index.handlebars', {events:mainEvents, date});
    } catch (error) {
        next(error)
    }
});

viewsRouter.use("/products",productsRouter)
viewsRouter.use("/users",usersRouter)

export default viewsRouter