// server.js
import express from "express";
import ProductManager from "./data/fs/productFS.js";
import UserManager from "./data/fs/userFS.js";

const productManager = new ProductManager(); // instancia de ProductManager
const userManager = new UserManager(); //instancia de UserManager


const server = express();

const PORT = 8080;
const ready = () => console.log("Server on port " + PORT);

// Middleware para procesar los datos
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Inicio el servidor
server.listen(PORT, ready);

// ENDPOINTS DE PRODUCT MANAGER //

// Endpoint para crear los productos
server.post("/api/products/create", async (req, res) => {
    try {
        const productData = req.body;
        const createdProductId = await productManager.create(productData);
        const productList = await productManager.read();

        return res.status(201).json({
            success: true,
            id: createdProductId,
            message: "Product successfully created.",
            productList: productList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            response: error.message,
        });
    }
});

// Endpoint para obtener la lista de productos
server.get("/api/products", async (req, res) => {
    try {
        const productList = await productManager.read();

        if (productList.length > 0) {
            console.log("Product List:", productList);
            return res.status(200).json({
                success: true,
                response: productList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Products not found",
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
server.get("/api/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const product = productManager.readOne(id);

        if (product) {
            return res.status(200).json({
                success: true,
                response: product,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


//endpoint para eliminar un prod por ID
server.delete("/api/products/delete/:pid", (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = productManager.destroy(id);

        if (isDeleted) {
            return res.status(200).json({
                success: true,
                message: `Product with ID ${id} has been successfully deleted.`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found. No product has been deleted.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// ------------------------------------------------------ENDPOINTS DE USER MANAGER --------------------------------------------------//

// Endpoint para crear los usuarios
server.post("/api/users/create", async (req, res) => {
    try {
        const userData = req.body;
        await userManager.create(userData);

        return res.status(201).json({
            success: true,
            message: "User successfully created.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            response: error.message,
        });
    }
});

// Endpoint para obtener la lista de usuarios
server.get("/api/users", (req, res) => {
    try {
        const userList = userManager.read();

        if (userList.length > 0) {
            console.log("User List:", userList);
            return res.status(200).json({
                success: true,
                response: userList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Users not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Endpoint para obtener un usuario readOne(ID)
server.get("/api/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        const user = userManager.readOne(id);

        if (user) {
            return res.status(200).json({
                success: true,
                response: user,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Endpoint para eliminar un usuario por ID
server.delete("/api/users/delete/:uid", (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = userManager.destroy(id);

        if (isDeleted) {
            return res.status(200).json({
                success: true,
                message: `User with ID ${id} has been successfully deleted.`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `User with ID ${id} not found. No user has been deleted.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
