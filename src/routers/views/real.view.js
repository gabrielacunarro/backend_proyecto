import { Router } from "express";
import productsManager from '../../data/fs/productFS.js';

const realViewRouter = Router();

realViewRouter.get('/real', async (req, res, next) => {
    try {
        const productList = await productsManager.read();

        return res.render('layouts/real.handlebars', { productList });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default realViewRouter;
