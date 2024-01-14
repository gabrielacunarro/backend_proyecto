import { Router } from "express";

import productsRouter from "./products.view.js";
import productsManager from '../../data/fs/productFS.js';

const viewsRouter = Router()

viewsRouter.get('/', async (req, res, next) => {
    try {

        const productList = await productsManager.read();

        return res.render('layouts/index.handlebars', { productList });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

viewsRouter.use("/products", productsRouter)

export default viewsRouter