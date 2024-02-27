import { orders } from "../../data/mongo/manager.mongo.js";
//import ordersManager from "../../data/fs/orderFS.js";
import { Router } from "express";

const ordersRouter = Router();

// Endpoint para crear una orden
ordersRouter.post("/", async (req, res, next) => {
    try {
        const orderData = req.body;
        const createdOrder = await orders.create(orderData);

        return res.json({
            statusCode: 201,
            response: "Order created successfully",
            data: createdOrder,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// Endpoint para obtener la lista de órdenes
ordersRouter.get("/", async (req, res, next) => {
    try {
        const orderAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
        };

        const filter = {};

        if (req.query.uid) {
            filter.uid = new RegExp(req.query.uid.trim(), 'i');
        }

        let all;

        if (req.query.sort === "desc") {  // Ordenar por fecha de creación en orden descendente
            all = await orders.read({
                filter,
                orderAndPaginate: {
                    ...orderAndPaginate,
                    sort: { createdAt: -1 },
                },
            });
        } else {
            all = await orders.read({ filter, orderAndPaginate });
        }

        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        }
        return res.json({
            statusCode: 404,
            response: all,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Endpoint para obtener el total a pagar de una orden por usuario
ordersRouter.get("/total/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const report = await orders.report(uid);

        return res.json({
            statusCode: 200,
            response: report,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Endpoint para obtener las órdenes del usuario logueado
ordersRouter.get("/", async (req, res, next) => {
    try {
        // Obtener el ID de usuario autenticado desde la solicitud
        const userId = req.user.id;

        // Filtrar las órdenes por el ID de usuario
        const all = await orders.read({ filter: { uid: userId } });

        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        }
        return res.json({
            statusCode: 404,
            response: all,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// Endpoint para obtener una orden por ID
ordersRouter.get("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const order = await orders.readOne(oid);

        if (order) {
            return res.json({
                statusCode: 200,
                response: order,
            });
        } else {
            const error = new Error(`Order with ID ${oid} not found.`);
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
        const one = await orders.destroy(oid);

        if (one) {
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

        const updatedOrder = await orders.update(oid, { quantity, state });

        return res.json({
            statusCode: 200,
            response: `Order with ID ${oid} has been successfully updated.`,
            data: updatedOrder,
        });
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;

