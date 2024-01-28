import { Router } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const formViewRouter = Router();
const httpServer = createServer();
const io = new Server(httpServer);

// Ruta para manejar la solicitud GET de la página de registro
formViewRouter.get('/form', (req, res) => {
    res.render('layouts/form');
});

// Ruta para manejar la solicitud POST del formulario de registro
formViewRouter.post('/form', (req, res) => {
    const { title, description, photo, price, stock } = req.body;

    // Imprimir los datos en la consola del servidor
    console.log("title:", title);
    console.log("description:", description);
    console.log("photo:", photo);
    console.log("price:", price);
    console.log("stock:", stock);

    // Emitir un evento a través de Socket.IO para notificar a los clientes conectados
    io.emit('update', { message: 'Nuevo dato recibido' });

    res.send('Registro exitoso');
});

// Configurar Socket.IO para escuchar en el mismo servidor HTTP
io.attach(httpServer);

export { formViewRouter, httpServer };

