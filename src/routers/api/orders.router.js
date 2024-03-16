import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js"
import { create, read, readOne, destroy, update, bills } from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
    init() {
        this.create("/", ["USER"], passCbMid("jwt"), create);
        this.read("/", ["USER"], read);
        this.read("/", ["USER"], readOne);
        this.destroy("/:oid", ["USER"], destroy);
        this.update("/:oid", ["USER"], update);
        this.read("/total/:uid", ["USER"], bills);
    }
}





