import { Router } from "express";

const registerViewRouter = Router();

// Ruta para manejar la solicitud GET de la página de registro
registerViewRouter.get('/register', (req, res) => {
    res.render('layouts/register');
});

// Ruta para manejar la solicitud POST del formulario de registro
registerViewRouter.post('/register', (req, res) => {
    // Lógica para procesar la solicitud de registro aquí
    const { username, password, email } = req.body;

    // Ejemplo: Puedes imprimir los datos del formulario
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);

    res.send('Registro exitoso'); // Puedes enviar una respuesta adecuada
});

export default registerViewRouter;

