import checkoutRepository from "../repositories/payments.repositories.js";

class CheckoutService {
    constructor() {}

    async create(data) {
        try {
            const { sessionId, stripeUrl } = await checkoutRepository.create(data);
            return { sessionId, stripeUrl };
        } catch (error) {
            throw error;
        }
    }
}

const checkoutService = new CheckoutService();
export default checkoutService;
