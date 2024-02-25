import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";

const sessionsViewRouter = Router();
sessionsViewRouter.get('/sessions/register', (req, res) => {
    res.render('layouts/register');
});

sessionsViewRouter.post('/sessions/register', async (req, res) => {
    res.redirect('/sessions/login');
});

sessionsViewRouter.get('/sessions/login', (req, res) => {

    res.render('layouts/login');
});

sessionsViewRouter.post('/sessions/login', async (req, res) => {

    res.redirect('/');
});

export default sessionsViewRouter;



