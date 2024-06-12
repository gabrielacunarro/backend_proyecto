import { Router } from "express";

const ordersViewRouter = Router();

ordersViewRouter.get('/orders', (req, res) => {
    res.render('layouts/orders');
});

ordersViewRouter.post('/orders', (req, res) => {

});

export default ordersViewRouter;