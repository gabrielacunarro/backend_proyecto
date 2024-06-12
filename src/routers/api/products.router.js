import CustomRouter from "../CustomRouter.js";
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
    }
}
