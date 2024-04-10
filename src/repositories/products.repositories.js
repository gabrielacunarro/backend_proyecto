import ProductDTO from "../dto/product.dto.js";
import dao from "../data/index.dao.js";

const { products } = dao;

class ProductsRep {
    constructor() {
        this.model = products;
    }

    create = async (data) => await this.model.create(new ProductDTO(data));
    read = async ({ filter, orderAndPaginate }) => await this.model.read({ filter, orderAndPaginate })
    readOne = async (id) => await this.model.readOne(id)
    update = async (id, data) => await this.model.update(id, data)
    destroy = async (id) => await this.model.destroy(id)
}

const productsRepository = new ProductsRep();
export default productsRepository;
