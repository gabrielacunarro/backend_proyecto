import { faker } from '@faker-js/faker';
import repository from '../../repositories/users.repositories.js';
import "dotenv/config.js";
import createComment from './comments.mock.js';
import winston from '../../utils/logger/winston.utils.js';

function usersMock() {
    return {
        name: faker.person.firstName(),
        email: (faker.person.firstName() + faker.person.lastName()).toLowerCase() + faker.number.hex(64) + "@coder.com",
        password: "hola1234"
    }
}

async function createUser() {
    try {
        const data = usersMock();
        const user = await repository.create(data);
        for (let i = 1; i <= 10; i++) {
            await createComment(user._id);
        }

    } catch (error) {
        winston.error("Error:", error);
    }
}

for (let i = 1; i <= 10; i++) {
    createUser();
}
winston.INFO("DATA MOCKED! ")