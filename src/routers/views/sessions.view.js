import { Router } from "express";

const sessionsViewRouter = Router();
sessionsViewRouter.get('/register', (req, res) => {
    res.render('layouts/register');
});

sessionsViewRouter.post('/register', async (req, res) => {

});

sessionsViewRouter.get('/login', (req, res) => {

    res.render('layouts/login');
});

sessionsViewRouter.post('/login', async (req, res) => {

});

sessionsViewRouter.get('/reset', (req, res) => {

    res.render('layouts/reset');
});

sessionsViewRouter.post('/reset', async (req, res) => {

});

export default sessionsViewRouter;



