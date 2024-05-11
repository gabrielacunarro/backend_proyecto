import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js";
import { create, read, update, destroy } from "../../controllers/carts.controller.js";

export default class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER","PREM"], passCbMid("jwt"), create);
        this.read("/", ["USER","PREM"], read);
        this.update("/:cid", ["USER","PREM"], passCbMid("jwt"), update);
        this.destroy("/:cid", ["USER","PREM"], passCbMid("jwt"), destroy);
    }
}
