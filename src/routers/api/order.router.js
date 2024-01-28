import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";
import mongoose from "mongoose";
//import ordersManager from "../../data/fs/orderFS.js";

const ordersRouter = Router();

// Endpoint para crear una orden
ordersRouter.post("/", async (req, res, next) => {
    try {
        const orderData = req.body;
        
        // Asegúrate de que uid y pid sean ObjectId válidos
        orderData.uid = mongoose.Types.ObjectId(orderData.uid);
        orderData.pid = mongoose.Types.ObjectId(orderData.pid);

        const createdOrder = await Order.create(orderData);

        return res.json({
            statusCode: createdOrder.statusCode,
            response: createdOrder.response.message,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


// Endpoint para obtener la lista de órdenes
ordersRouter.get("/", async (req, res, next) => {
    try {
        const orderList = await orders.readOrders();

        if (orderList && orderList.length > 0) {
            return res.json({
                statusCode: 200,
                data: orderList,
            });
        } else {
            const error = new Error("Orders not found");
            error.statusCode = 400;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para obtener todas las órdenes de un usuario
ordersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const userOrders = orders.readByUser(uid);

        if (userOrders && userOrders.length > 0) {
            return res.json({
                statusCode: 200,
                response: userOrders,
            });
        } else {
            const error = new Error(`Orders for user with ID ${uid} not found`);
            error.statusCode = 404;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para eliminar una orden por ID
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const isDeleted = orders.destroyOrder(oid);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                response: `Order with ID ${oid} has been successfully deleted.`,
            });
        } else {
            const error = new Error(`Order with ID ${oid} not found. No order has been deleted.`);
            error.statusCode = 404;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para actualizar una orden por ID
ordersRouter.put("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const { quantity, state } = req.body;

        const updatedOrder = await orders.updateOrder(oid, quantity, state, next);

        return res.json(updatedOrder);
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;

