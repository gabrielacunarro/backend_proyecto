import CustomRouter from "../CustomRouter.js";
//import productsManager from "../../data/fs/productFS.js"
import passCb from "../../middlewares/passCb.mid.js"
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREM"], passCb("jwt", { session: false }), create);
        this.read("/", ["PUBLIC"], read);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.update("/:pid", ["ADMIN", "PREM"], update);
        this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
    }
}
