import checkoutRepo from '../repositories/payments.repositories.js';

class checkoutService {
    async create(data) {
        try {
            const { orderIds } = data;

            const intent = await checkoutRepo.create(orderIds);
            return intent;
        } catch (error) {
            console.error('Error creating payment: ', error);
            throw new Error('Error creating payment: ' + error.message);
        }
    }
}

const service = new checkoutService();
export default service;
