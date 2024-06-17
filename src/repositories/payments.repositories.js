import Stripe from 'stripe';
import CheckoutProduct from '../dto/checkout.dto.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class checkoutRepository {
    constructor() {
    }

    create = async (data) => {
        try {
            const products = [
                { product_id: { title: 'Perfume', price: 90 }, quantity: 2 },
                { product_id: { title: 'Perfume Woman', price: 90 }, quantity: 1 }
            ];

            const line_items = products.map(product => new CheckoutProduct(product));

            const mode = 'payment';
            const success_url = 'http://localhost:8080/thanks';

            const intent = await stripe.checkout.sessions.create({
                line_items,
                mode,
                success_url
            });

            return intent;
        } catch (error) {
            console.error('Error creating payment: ', error);
            throw new Error('Error creating payment: ' + error.message);
        }
    };
}

const checkoutRepo = new checkoutRepository();
export default checkoutRepo;
