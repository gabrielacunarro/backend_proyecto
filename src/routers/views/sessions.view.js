import { Router } from "express";

const sessionsViewRouter = Router();
sessionsViewRouter.get('/sessions/register', (req, res) => {
    res.render('layouts/register');
});

sessionsViewRouter.post('/sessions/register', async (req, res) => {

});

sessionsViewRouter.get('/sessions/login', (req, res) => {

    res.render('layouts/login');
});

sessionsViewRouter.post('/sessions/login', async (req, res) => {

});

export default sessionsViewRouter;



