import checkoutService from "../services/payments.services.js";

class PaymentsController {
    constructor() {
        this.service = checkoutService;
    }

    create = async (req, res, next) => {
        try {
            const { _id: user_id } = req.user;
            let orders = req.body.orders;

            if (!orders) {
                orders = [];
            } else if (!Array.isArray(orders)) {
                throw new Error('Orders should be an array');
            }

            const { sessionId, stripeUrl } = await this.service.create(orders);


            return res.status(201).json({ sessionId, stripeUrl });
        } catch (error) {
            return next(error);
        }
    };
}

const controller = new PaymentsController();
export default controller;
export const { create } = controller;
