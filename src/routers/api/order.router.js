import { Router } from "express";
import ordersManager from "../../data/fs/orderFS.js";

const ordersRouter = Router();

// Endpoint para crear una orden
ordersRouter.post("/", async (req, res) => {
    try {
        const orderData = req.body;
        const createdOrder = await ordersManager.createOrder(orderData);

        return res.json({
            statusCode: createdOrder.statusCode,
            response: createdOrder.response.message,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            response: error.message,
        });
    }
});

// Endpoint para obtener la lista de órdenes
ordersRouter.get("/", async (req, res, next) => {
    try {
        const orderList = await ordersManager.readOrders();

        if (orderList && orderList.length > 0) {
            return res.json({
                statusCode: 200,
                data: orderList,
            });
        } else {
            return res.json({
                statusCode: 400,
                response: "Orders not found",
            });
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para obtener todas las órdenes de un usuario
ordersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const userOrders = ordersManager.readByUser(uid);

        if (userOrders && userOrders.length > 0) {
            return res.json({
                statusCode: 200,
                response: userOrders,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `Orders for user with ID ${uid} not found`,
            });
        }
    } catch (error) {
        return next(error);
    }
});



// Endpoint para eliminar una orden por ID
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const isDeleted = ordersManager.destroyOrder(oid);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                response: `Order with ID ${oid} has been successfully deleted.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `Order with ID ${oid} not found. No order has been deleted.`,
            });
        }
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;
