import { users } from "../data/mongo/manager.mongo.js";

class UsersService {
    constructor() {
        this.model = users
    }

    create = async (data) => {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            error.statusCode = 400
            throw error
        }
    };

    read = async ({ filter, orderAndPaginate }) => {
        try {
            const response = await this.model.read({ filter, orderAndPaginate })
            return response
        } catch (error) {
            error.statusCode = 404
            throw error
        }
    };

    readOne = async (id) => {
        try {
            const response = await this.model.readOne(id)
            return response
        } catch (error) {
            error.statusCode = 404
            throw error
        }
    };

    update = async (id) => {
        try {
            const response = await this.model.update(id)
            return response
        } catch (error) {
            error.statusCode = 404
            throw error
        }
    }

    destroy = async (id) => {
        try {
            const response = await this.model.destroy(id)
            return response
        } catch (error) {
            error.statusCode = 404
            throw error
        }
    };

    readByEmail = async (email) => {
        try {
            const response = await this.model.readByEmail(email)
            return response
        } catch (error) {
            error.statusCode = 404
            throw error
        }
    };
}

const service = new UsersService();
export default service;