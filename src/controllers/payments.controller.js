import checkoutService from "../services/payments.services.js";

class CheckoutController {
    constructor() {
        this.service = checkoutService;
    }

    create = async (req, res, next) => {
        try {
            const { user_id } = req.session;

            const response = await this.service.create({ user_id });
            return res.status(201).json(response);
        } catch (error) {
            return next(error);
        }
    };
}

const controller = new CheckoutController();
export default controller;
export const { create } = controller;
