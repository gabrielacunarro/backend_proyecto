import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js"
import { create, read, readOne, destroy, update, bills } from "../../controllers/orders.controller.js";

export default class OrdersRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), create);
        this.read("/", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), read);
        this.read("/", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), readOne);
        this.destroy("/:oid", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), destroy);
        this.update("/:oid", ["USER"], passCbMid("jwt"), update);
        this.read("/total/:uid", ["USER"], passCbMid("jwt"), bills);
    }
}    




