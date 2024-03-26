import repository from "../repositories/users.repositories.js";

class OrdersServices {
    constructor() {
        this.repository = repository
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter, orderAndPaginate }) => await this.repository.read({ filter, orderAndPaginate })
    readOne = async (id) => await this.repository.readOne(id)
    readByEmail = async (email) => await this.repository.readByEmail(email)
    update = async (id, data) => await this.repository.update(id, data)
    destroy = async (id) => await this.repository.destroy(id)
}

const service = new OrdersServices()
export default service;