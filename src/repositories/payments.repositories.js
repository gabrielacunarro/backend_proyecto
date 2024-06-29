import Stripe from 'stripe';
import CheckoutProduct from '../dto/payments.dto.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class checkoutRepository {
    constructor() {}

    create = async (data) => {
        try {
            const products = data.map(item => ({
                product_id: {
                    title: item.pid.title,
                    price: item.pid.price
                },
                quantity: item.quantity
            }));

            const line_items = products.map(product => new CheckoutProduct(product));

            const mode = 'payment';
            const success_url = 'http://localhost:8080/thanks';

            const session = await stripe.checkout.sessions.create({
                line_items,
                mode,
                success_url
            });

            return { sessionId: session.id, stripeUrl: session.url };
        } catch (error) {
            console.error('Error creating payment: ', error);
            throw new Error('Error creating payment: ' + error.message);
        }
    };
}

const checkoutRepo = new checkoutRepository();
export default checkoutRepo;
