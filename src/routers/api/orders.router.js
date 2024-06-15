import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js"
import { create, read, readOne, destroy, update, bills } from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), create);
        this.read("/", ["USER", "ADMIN", "PREM"], read);
        this.read("/", ["USER", "ADMIN", "PREM"], readOne);
        this.destroy("/:oid", ["USER", "ADMIN", "PREM"], destroy);
        this.update("/:oid", ["USER"], update);
        this.read("/total/:uid", ["USER"], bills);
    }
}    




