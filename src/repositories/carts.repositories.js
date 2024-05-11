import CartDTO from "../dto/cart.dto.js";
import dao from "../data/index.dao.js";

const { carts } = dao;

class CartRepository {
    constructor() {
        this.model = carts;
    }

    create = async (data) => await this.model.create(new CartDTO(data));
    read = async ({ filter }) => await this.model.read({ filter });
    readOne = async (id) => await this.model.readOne(id);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const cartRepository = new CartRepository();
export default cartRepository;
