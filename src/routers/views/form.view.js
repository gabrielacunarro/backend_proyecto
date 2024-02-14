import { Router } from "express";

const formViewRouter = Router();

formViewRouter.get('/form', (req, res) => {
    res.render('layouts/form');
});

formViewRouter.post('/form', (req, res) => {
    const { title, description, photo, price, stock } = req.body;

    res.send('Registro exitoso');
});

export default formViewRouter;


