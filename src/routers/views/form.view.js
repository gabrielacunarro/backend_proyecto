import { Router } from "express";

const formViewRouter = Router();

// Ruta para manejar la solicitud GET de la página de registro
formViewRouter.get('/products/form', (req, res) => {
    res.render('layouts/form');
});

// Ruta para manejar la solicitud POST del formulario de registro
formViewRouter.post('/form', (req, res) => {
    // Lógica para procesar la solicitud de registro aquí
    const { title, description, photo,price,stock } = req.body;

    // Ejemplo: Puedes imprimir los datos del formulario
    console.log("title:", title);
    console.log("description:", description);
    console.log("photo:", photo);
    console.log("price:", price);
    console.log("stock:", stock);

    res.send('Registro exitoso'); // Puedes enviar una respuesta adecuada
});

export default formViewRouter;
