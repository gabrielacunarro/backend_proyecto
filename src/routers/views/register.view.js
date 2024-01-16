import { Router } from "express";

const registerViewRouter = Router();

registerViewRouter.get('/register', (req, res) => {
    res.render('layouts/register');
});

registerViewRouter.post('/register', (req, res) => {

    const { username, password, email } = req.body;

    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    res.send('Registro exitoso');
});

export default registerViewRouter;

