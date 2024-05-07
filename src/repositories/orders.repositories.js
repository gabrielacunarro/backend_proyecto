import OrderDTO from "../dto/order.dto.js";
import dao from "../data/index.dao.js";

const { orders } = dao;

class OrdersRep {
    constructor() {
        this.model = orders;
    }

    create = async (data) => await this.model.create(new OrderDTO(data));
    read = async ({ filter }) => await this.model.read({ filter });
    readOne = async (id) => await this.model.readOne(id);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const repository = new OrdersRep();
export default repository;
