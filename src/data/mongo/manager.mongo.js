import User from "./models/user.model.js";
import Product from "./models/product.model.js"
import Order from "./models/order.model.js";

class MongoManager {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        try {
            const one = await this.model.create(data) // create metodo de mongoose
            return one._id // mongo para ID
        } catch (error) {
            throw error;
        }
    }
    async read(obj) {
        try {
            const { filter, order } = obj // desestructurar, obj es un objeto con 2 propiedades filter = consulta para el filtro y sort = con el obj de ordenamiento
            const all = await this.model.find(filter).sort(order) // metodo find de mongoose
            if (all.length === 0) {
                const error = new Error("There isn't documents")
                error.statusCode = 404;
                throw error;
            }
            return all;
        } catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            const one = await this.model.findById(id)
            if (!one) {
                const error = new Error("There isn't any products")
                error.statusCode = 404
                throw error;
            }
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const opt = { new: true } // este obj de config opcional devuelve el objeto luego de la modificacion
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            if (!one) {
                const error = new Error("There isn't any products")
                error.statusCode = 404
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id)
            if (!one) {
                const error = new Error("There isn't any products")
                error.statusCode = 404
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
}

const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)
export { users, products, orders }