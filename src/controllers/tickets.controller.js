import TicketService from "../services/tickets.services.js";
import ProductService from "../services/products.services.js"; 
import CartService from "../services/carts.services.js";
import customError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

class TicketsController {
    constructor() {
        this.service = TicketService;
    }

    createTicket = async (req, res, next) => {
        try {
            const existingTicket = await this.service.read({ filter: { user: req.user._id, status: "active" } });
    
            if (existingTicket) {
                return res.status(400).json({ message: "You already have an active ticket" });
            }
    
            const { pid, quantity } = req.body; 
            const product = await ProductService.readOne(pid); 
    
            if (!product) {
                const error = customError.new(errors.notFound);
                throw error;
            }
    
            const total = product.price * quantity; 
    
            const data = {
                user: req.user._id,
                products: [{ pid, quantity }], 
                total: total
            };
    
            const createdTicket = await this.service.create(data);
    
            return res.status(201).json({ message: "Ticket created successfully", ticket: createdTicket });
        } catch (error) {
            return next(error);
        }
    };

    calculateTotal = async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "You are not logged in" });
            }

            const userId = req.user._id;

            const cart = await cart.findOne({ uid: userId }).populate('products.pid');
    
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            let total = 0;
            cart.products.forEach(product => {
                total += product.pid.price * product.quantity;
            });
            console.log("Total calculado:", total);
    
            return res.status(200).json({ total });
        } catch (error) {
            return next(error);
        }
    };
}

export default TicketsController;
const controller = new TicketsController();
const { createTicket, calculateTotal } = controller;
export { createTicket, calculateTotal };