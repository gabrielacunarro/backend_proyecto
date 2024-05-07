import ordersServices from "../services/orders.services.js"
import customError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

class OrdersController {
    constructor() {
        this.service = ordersServices
    }

    create = async (req, res, next) => {
        try {
            if (!req.user || req.user.role !== 0) {
                const error = customError.new(errors.forbidden);
                throw error;
            }
            const data = req.body;
            const createdOrder = await this.service.create(data);

            return res.success201( createdOrder)
        } catch (error) {
            console.error(error);
            return next(error);
        }
    };


    read = async (req, res, next) => {
        try {
            const filter = {};
            if (req.query.uid) {
                filter.uid = req.query.uid;
            }
            const all = await this.service.read({ filter });
            return res.success200(all);
        } catch (error) {
            return next(error);
        }
    };

    readOne = async (req, res, next) => {
        try {

            if (!req.user) {
                return res.status(401).json({ message: "You are not logged in" });
            }

            const userOrders = await this.service.find({ uid: req.user._id });

            return res.success200(userOrders);
        } catch (error) {
            console.error(error);
            return res.error500("Internal server error");
        }
    };

    update = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const { quantity, state } = req.body;

            const updatedOrder = await this.service.update(oid, { quantity, state });

            return res.success200(`Order with ID ${oid} has been successfully updated.`, updatedOrder);
        } catch (error) {
            return next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const one = await this.service.destroy(oid);

            if (one) {
                return res.success200(`Order with ID ${oid} has been successfully deleted.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    };

    bills = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const report = await this.service.report(uid);

            return res.success200(report);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default OrdersController
const controller = new OrdersController()
const { create, read, readOne, destroy, update, bills } = controller
export { create, read, readOne, destroy, update, bills }