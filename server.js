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

        return res.json({
            statusCode: 201,
            message: "Product successfully created.",
            data: {
                id: createdProductId,
                productList: productList,
            },
        });
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para obtener la lista de productos
server.get("/api/products", async (req, res) => {
    try {
        const productList = await productManager.read();

        if (productList.length > 0) {
            console.log("Product List:", productList);
            return res.json({
                statusCode: 200,
                data: productList,
            });
        } else {
            return res.json({
                statusCode: 400,
                message: "Products not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para obtener un producto readOne(ID)
server.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = productManager.readOne(id);

        if (product) {
            return res.json({
                statusCode: 200,
                data: product,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "Product not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para eliminar un prod por ID
server.delete("/api/products/delete/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const isDeleted = productManager.destroy(pid);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                message: `Product with ID ${pid} has been successfully deleted.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: `Product with ID ${pid} not found. No product has been deleted.`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
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

        return res.json({
            statusCode: 201,
            message: "User successfully created.",
        });
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para obtener la lista de usuarios
server.get("/api/users", async (req, res) => {
    try {
        const userList = userManager.read();

        if (userList.length > 0) {
            console.log("User List:", userList);
            return res.json({
                statusCode: 200,
                data: userList,
            });
        } else {
            return res.json({
                statusCode: 400,
                message: "Users not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para obtener un usuario readOne(ID)
server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = userManager.readOne(uid);

        if (user) {
            return res.json({
                statusCode: 200,
                data: user,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

// Endpoint para eliminar un usuario por ID
server.delete("/api/users/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = userManager.destroy(id);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                message: `User with ID ${id} has been successfully deleted.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: `User with ID ${id} not found. No user has been deleted.`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});








