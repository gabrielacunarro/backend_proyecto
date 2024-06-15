products.router
import CustomRouter from "../CustomRouter.js";
<<<<<<< HEAD
//import productsManager from "../../data/fs/productFS.js"
import passCb from "../../middlewares/passCb.mid.js"
import isAdmin from "../../middlewares/isAdmin.mid.js"
import isAuth from "../../middlewares/isAuth.mid.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREM"], isAuth, create); //passCb("jwt", { session: false }),
        this.read("/", ["PUBLIC"], read);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.update("/:pid", ["ADMIN", "PREM"], update);
        this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
=======
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

>>>>>>> origin/main
    }
}
