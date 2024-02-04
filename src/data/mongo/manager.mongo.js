import User from "./models/user.model.js";
import Product from "./models/product.model.js"
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js"
//import mongoose from "mongoose";

//mongoose.set('strictPopulate', false);


class MongoManager {
    constructor(model) {
        this.model = model
    }
    async create(data) {
        try {
            const one = await this.model.create(data) // create metodo de mongoose
            return one._id
        } catch (error) {
            throw error;
        }
    }
    async read(obj) {
        try {
            let { filter, order } = obj || {};// desestructurar, obj es un objeto con 2 propiedades filter = consulta para el filtro y sort = con el obj de ordenamiento
            const all = await this.model.find(filter, "-createdAt -updatedAt -__v").sort(order) // metodo find de mongoose
            if (all.length === 0) {
                const error = new Error("There isn't any documents")
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
            notFoundOne(one)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const opt = { new: true } // este obj de config opcional devuelve el objeto luego de la modificacion
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            notFoundOne(one)
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id)
            notFoundOne(one)
            return one;
        } catch (error) {
            throw error;
        }
    }
    async readByEmail(email) {
        try {
            const user = await this.model.findOne({ email });

            if (!user) {
                const error = new Error(`No user found with email: ${email}`);
                error.statusCode = 404;
                throw error;
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async stats({ filter }) {
        try {
            let stats = await this.model.find(filter).explain("executionStats");
            console.log(stats);
            stats = {
                quantity: stats.executionStats.nReturned,
                time: stats.executionStats.excecutionTimeMillis,
            }
            return stats
        } catch (error) {
            throw error
        }
    }
}


const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)
export { users, products, orders }