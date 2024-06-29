import repository from "../repositories/orders.repositories.js";

class OrdersServices {
    constructor() {
        this.repository = repository
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter }) => await this.repository.read({ filter })
    readOne = async (id) => await this.repository.readOne(id)
    update = async (id, data) => {
        try {
            const updatedOrder = await this.repository.update(id, data);
            return updatedOrder; 
        } catch (error) {
            throw new Error(`Error updating order: ${error.message}`);
        }
    };
    
    destroy = async (id) => await this.repository.destroy(id)
}

const service = new OrdersServices()
export default service;