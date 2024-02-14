import { Router } from "express";
import User from "../../data/mongo/models/user.model.js"; 

const loginViewRouter = Router();

loginViewRouter.get('/auth/login', (req, res) => {
    res.render('layouts/login');
});

loginViewRouter.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await user.comparePassword(password)) {

            res.send('Inicio de sesión exitoso');
        } else {

            res.render('layouts/login', { error: 'Nombre de usuario o contraseña incorrectos' });
        }
    } catch (error) {
        // Manejar cualquier error de la base de datos u otro error
        console.error('Error al autenticar al usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Exportar el enrutador
export default loginViewRouter;
