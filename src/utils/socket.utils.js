import { Server } from "socket.io";
import productsManager from "../../src/data/fs/productFS.js";
import usersManager from "../../src/data/fs/userFS.js";
import propsUsersUtils from "./propsUsers.mid.js";
import propsProductsUtils from "./propsProducts.mid.js";

export const socketUtils = (socket) => {
    console.log(socket.id);

    emitProducts(socket);

    emitUsers(socket);

    socket.on("new product", async (data) => {
        try {
            propsProductsUtils(data, "POST", "/form");

            await productsManager.create(data);

            socket.emit("new success", "Product added successfully!");

            emitProducts(socket);
        } catch (error) {
            console.log(error);

            socket.emit("new error", error.message);
        }
    });

    socket.on("new user", async (data) => {
        try {
            propsUsersUtils(data, "POST", "/users/form");

            await usersManager.create(data);

            socket.emit("new success", "User registered successfully!");

            emitUsers(socket);
        } catch (error) {
            console.log(error);

            socket.emit("new error", error.message);
        }
    });
};

async function emitProducts(socket) {
    try {
        const products = await productsManager.read();
        socket.emit("products", products);
    } catch (error) {
        console.error('Error al leer la lista de productos:', error);
    }
}

async function emitUsers(socket) {
    try {
        const users = await usersManager.read();
        socket.emit("users", users);
    } catch (error) {
        console.error('Error al leer la lista de usuarios:', error);
    }
}
