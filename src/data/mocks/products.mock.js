import { faker } from '@faker-js/faker';
import productsRepository from '../../repositories/products.repositories.js';
import "dotenv/config.js";

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
            console.log("PRODUCT CREATED:", product);
        }
    } catch (error) {
        console.error("Error creating product:", error);
    }
}
createProduct()
