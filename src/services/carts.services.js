import cartRepository from "../repositories/carts.repositories.js";

class CartServices {
    constructor() {
        this.repository = cartRepository;
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter }) => await this.repository.read({ filter });
    readOne = async (id) => await this.repository.readOne(id);
    update = async (id, data) => await this.repository.update(id, data);
    destroy = async (id) => await this.repository.destroy(id);
}

const cartService = new CartServices();
export default cartService;
