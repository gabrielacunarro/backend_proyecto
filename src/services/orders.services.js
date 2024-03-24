import  orders  from "../data/mongo/orders.mongo.js";

class OrdersServices {
    constructor() {
        this.model = orders
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

    read = async ({ filter }) => {
        try {
            const response = await this.model.read({ filter })
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
            throw error
        }
    };
}

const service = new OrdersServices()
export default service;