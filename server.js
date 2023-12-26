import express from "express";
import ProductManager from "./data/fs/productFS.js";
//import UserManager from "./data/fs/userFS.js";
//import Prueba from "./prueba.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);

// Middleware para procesar los datos
server.use(express.urlencoded({ extended: true }));

// Crear una instancia de ProductManager
//const productManagerInstance = new ProductManager();

// Inicio el servidor
server.listen(PORT, ready);

// server.get("/api/products", (req, res) => {
//     try {

//         // Llama al método estático getProducts de la clase ProductManager
//         const productList = ProductManager.getProducts();

//         if (productList.length > 0) {
//             console.log("Product List:", productList);
//             return res.status(200).json({
//                 success: true,
//                 response: productList,
//             });
//         } else {
//             return res.status(400).json({
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




// //endpoint de prueba

// server.get('/realizar-prueba', (req, res) => {
//     res.send('Esto es una prueba'); // Envía la respuesta al navegador
// });