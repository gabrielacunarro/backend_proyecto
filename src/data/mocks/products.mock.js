import { faker } from '@faker-js/faker';
import productsRepository from '../../repositories/products.repositories.js';
import "dotenv/config.js";
import winston from '../../utils/logger/winston.utils.js';

function productsMock() {
    return {
        title: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        price: faker.commerce.price()
    };
}

async function createProduct() {
    try {
        for (let i = 0; i < 100; i++) {
            const data = productsMock();
            const product = await productsRepository.create(data);
            winston.INFO("PRODUCT CREATED:", product);
        }
    } catch (error) {
        winston.ERROR("Error creating product:", error);
    }
}
createProduct()
