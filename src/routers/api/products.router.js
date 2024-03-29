products.router
import CustomRouter from "../CustomRouter.js";
import { products } from "../../data/mongo/manager.mongo.js";
import passCb from "../../middlewares/passCb.mid.js"
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js"

export default class ProductsRouter extends CustomRouter {
    init() {
        // Endpoint para crear los productos
        this.create("/", ["ADMIN", "PREM"], passCb("jwt", { session: false }), create);
        // Endpoint para obtener la lista de productos
        this.read("/", ["PUBLIC"], read);
        // Endpoint para obtener un producto readOne(ID)
        this.read("/:eid", ["PUBLIC"], readOne);
        // Endpoint para actualizar un producto por ID
        this.update("/:eid", ["ADMIN", "PREM"], update);
        // Endpoint para eliminar un prod por ID
        this.destroy("/:pid", ["ADMIN", "PREM"], destroy);

    }
}


