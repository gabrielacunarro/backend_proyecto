import { orders, users } from "../../data/mongo/manager.mongo.js";
import { Router } from "express";
import passCbMid from "../../middlewares/passCb.mid.js" 
import isAuth from "../../middlewares/isAuth.mid.js"


const ordersRouter = Router();

// Endpoint para crear una orden
ordersRouter.post("/", passCbMid("jwt"), async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 0) {
            return res.status(403).json({ message: "You do not have permission to create orders" });
        }
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

//Endpoint para obtener order

ordersRouter.get("/", async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.uid) {
            filter.uid = req.query.uid;
        }
        const all = await orders.read({ filter });
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
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

// Ruta para obtener las órdenes del usuario logueado
ordersRouter.get("/", isAuth, async (req, res, next) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.user) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        // Obtener las órdenes del usuario logueado
        const userOrders = await orders.find({ uid: req.user._id });

        // Devolver las órdenes como respuesta
        return res.json(userOrders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
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

