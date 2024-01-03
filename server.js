import express from "express";
//import ProductManager from "./data/fs/productFS.js";
//import UserManager from "./data/fs/userFS.js";
import Prueba from "./prueba.js";

// Crear una instancia de ProductManager
//const productManagerInstance = new ProductManager();

const server = express();

const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);

// Middleware para procesar los datos
server.use(express.urlencoded({ extended: true }));

// Inicio el servidor
server.listen(PORT, ready);

// Endpoint para obtener la lista de productos
server.get("/api/products", async (req, res) => {
    try {
        // Llama al método read de la instancia de ProductManager
        const productList = await productManagerInstance.read();

        if (productList.length > 0) {
            console.log("Product List:", productList);
            return res.status(200).json({
                success: true,
                response: productList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Products not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



// Endpoint para obtener un producto readOne(ID)
// server.get("/api/products/:pid", (req, res) => {
//     try {
//         const { pid } = req.params;
//         const product = ProductManager.readOne(parseInt(pid, 10));

//         if (product) {
//             return res.status(200).json({
//                 success: true,
//                 response: product,
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "not found",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });

// server.get("/api/users", (req, res) => {
//     try {
//         const userList = userManager.read();

//         if (userList.length > 0) {
//             console.log("User List:", userList);
//             return res.status(200).json({
//                 success: true,
//                 response: userList,
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "not found"
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });




// //endpoint de prueba por fallas del productFS y el userFS

server.get('/realizar-prueba', (req, res) => {
    res.send('Esto es una prueba'); // Envía la respuesta al navegador
});