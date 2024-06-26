import ordersServices from "../services/orders.services.js"
import productsServices from "../services/products.services.js"
import usersServices from "../services/users.services.js"
import customError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

class OrdersController {
    constructor() {
        this.service = ordersServices
    }

    create = async (req, res, next) => {
        try {
            if (!req.user || req.user.role !== 0) {
                throw customError.new(errors.forbidden);
            }
            
            const { pid, uid } = req.body;
    
            if (!pid || !uid) {
                throw new Error('Missing pid or uid in request body');
            }
    
            const product = await productsServices.readOne(pid);
            if (!product) {
                throw new Error('Product not found');
            }
    
            const data = { ...req.body, uid }; 
            const createdOrder = await this.service.create(data);
            return res.success201(createdOrder);
        } catch (error) {
            return next(error);
        }
    };
    
    

    read = async (req, res, next) => {
        try {
            const filter = {};
            if (req.query.uid) {
                filter.uid = req.query.uid;
            }
            const all = await this.service.read({ filter: {uid: req.user._id} });
            return res.success200(all);
        } catch (error) {
            return next(error);
        }
    };

    readOne = async (req, res, next) => {
        try {
            const oid = req.body;
            
            if (!oid) {
                return res.status(400).json({ message: "OID parameter is required" });
            }
            const order = await this.service.readOne(oid);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
    
            return res.status(200).json(order);
        } catch (error) {
            return next(error);
        }
    };
    
    

    update = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const { quantity, state } = req.body;
    
            const updatedOrder = await this.service.update(oid, { quantity, state });
    
            return res.success200(updatedOrder);
        } catch (error) {
            return next(error);
        }
    };
    

    destroy = async (req, res, next) => {
        try {
            const { oid } = req.params;
            const one = await this.service.destroy(oid); 
    
            if (one) {
                return res.status(200).json({
                    statusCode: 200,
                    message: `Order with ID ${oid} has been successfully deleted.`,
                });
            } else {
                throw customError.new(errors.notFound);
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
            next(error);
        }
    };
    clearCart = async (req, res, next) => {
        try {
            const deletedOrders = await this.service.clearCart(req.user.id);

            if (deletedOrders.deletedCount > 0) {
                return res.status(200).json({ message: 'Cart orders successfully deleted' });
            } else {
                return res.status(404).json({ message: 'No cart orders found to delete' });
            }
        } catch (error) {
            return next(error);
        }
    };
}

export default OrdersController
const controller = new OrdersController()
const { create, read, readOne, destroy, update, bills,clearCart  } = controller
export { create, read, readOne, destroy, update, bills,clearCart  }