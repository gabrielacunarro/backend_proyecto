import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js"
import { create, read, readOne, destroy, update, bills } from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
    init() {
<<<<<<< HEAD
        this.create("/", ["USER"], passCbMid("jwt"), create);
        this.read("/", ["USER"], read);
        this.read("/", ["USER"], readOne);
        this.destroy("/:oid", ["USER"], destroy);
        this.update("/:oid", ["USER"], update);
        this.read("/total/:uid", ["USER"], bills);
=======
        // Endpoint para crear una orden
        this.create("/", ["USER"],passCbMid("jwt"), async (req, res, next) => {
            try {
                if (!req.user || req.user.role !== 0) {
                    return res.status(403).json({ message: "You do not have permission to create orders" });
                }
                const orderData = req.body;
                const createdOrder = await orders.create(orderData);

                return res.success201("Order created successfully", createdOrder)
            } catch (error) {
                console.error(error);
                return next(error);
            }
        });

        //Endpoint para obtener order

        this.read("/",["USER"], async (req, res, next) => {
            try {
                const filter = {};
                if (req.query.uid) {
                    filter.uid = req.query.uid;
                }
                const all = await orders.read({ filter });
                return res.success200(all);
            } catch (error) {
                return next(error);
            }
        });

        // Endpoint para obtener el total a pagar de una orden por usuario
        this.read("/total/:uid",["USER"], async (req, res, next) => {
            try {
                const { uid } = req.params;
                const report = await orders.report(uid);

                return res.success200(report);
            } catch (error) {
                console.error(error);
                next(error);
            }
        });

        // Ruta para obtener las órdenes del usuario logueado
        this.read("/", ["USER"], async (req, res, next) => {
            try {

                if (!req.user) {
                    return res.status(401).json({ message: "You are not logged in" });
                }

                const userOrders = await orders.find({ uid: req.user._id });

                return res.success200(userOrders);
            } catch (error) {
                console.error(error);
                return res.error500("Internal server error");
            }
        });


        // Endpoint para eliminar una orden por ID
        this.destroy("/:oid",["USER"], async (req, res, next) => {
            try {
                const { oid } = req.params;
                const one = await orders.destroy(oid);

                if (one) {
                    return res.success200(`Order with ID ${oid} has been successfully deleted.`);
                } else {
                    return res.error404(`Order with ID ${oid} not found. No order has been deleted.`);
                }
            } catch (error) {
                return next(error);
            }
        });

        // Endpoint para actualizar una orden por ID
        this.update("/:oid",["USER"], async (req, res, next) => {
            try {
                const { oid } = req.params;
                const { quantity, state } = req.body;

                const updatedOrder = await orders.update(oid, { quantity, state });

                return res.success200(`Order with ID ${oid} has been successfully updated.`, updatedOrder);
            } catch (error) {
                return next(error);
            }
        });
>>>>>>> origin/main
    }
}





