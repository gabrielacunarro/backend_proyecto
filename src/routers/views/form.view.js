import { Router } from "express";
//import isAdmin from "../../middlewares/isAdmin.mid.js";

const formViewRouter = Router();

formViewRouter.get('/products/form', (req, res) => {
    res.render('layouts/form');
});

formViewRouter.post('/products/form', (req, res) => {
    const { title, description, photo, price, stock } = req.body;

    res.send('Registro exitoso');
});

export default formViewRouter;


