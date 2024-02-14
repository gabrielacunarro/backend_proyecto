import { Router } from "express";

const registerViewRouter = Router();

registerViewRouter.get('/auth/register', (req, res) => {
    res.render('layouts/register');
});

registerViewRouter.post('/auth/register', (req, res) => {
    const { username, email } = req.body;

    console.log("Username:", username);
    console.log("Email:", email);

    res.send('Registro exitoso');
});

export default registerViewRouter;


