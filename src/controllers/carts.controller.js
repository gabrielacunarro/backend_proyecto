import cartsServices from "../services/carts.services.js";
import productsServices from "../services/products.services.js";
import customError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

class CartsController {
    constructor() {
        this.service = cartsServices;
    }

    create = async (req, res, next) => {
        try {
            if (!req.user) {
                const error = customError.new(errors.unauthorized);
                throw error;
            }

            const { pid } = req.body;

            const product = await productsServices.readOne(pid);
            if (!product) {
                const error = customError.new(errors.notFound);
                throw error;
            }

            const data = {
                uid: req.user._id,
                products: [{ pid, quantity: 1 }], 
                status: "active" // establezco el estado del carrito como activo
            };

            const createdCart = await this.service.create(data);

            return res.success201(createdCart);
        } catch (error) {
            return next(error);
        }
    };
    read = async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "You are not logged in" });
            }
            
            const filter = { uid: req.user._id };

            const userCart = await this.service.read({ filter });
    
            if (!userCart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            return res.status(200).json(userCart);
        } catch (error) {
            return next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { cid } = req.params;
    
            const cartData = req.body;
    
            const updatedCart = await this.service.update(cid, cartData);

            return res.status(200).json(updatedCart);
        } catch (error) {
            return next(error);
        }
    };
    destroy = async (req, res, next) => {
        try {
            const { cid } = req.params;

            const deletedCart = await this.service.destroy(cid);
    
            if (!deletedCart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            return res.status(200).json({ message: "Cart deleted successfully" });
        } catch (error) {
            return next(error);
        }
    };
    
}

export default CartsController;
const controller = new CartsController();
const { create, read, readOne, destroy, update } = controller;
export { create, read, readOne, destroy, update };