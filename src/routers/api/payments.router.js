import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js";
import { create } from "../../controllers/payments.controller.js"; 

export default class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "PREM"], passCbMid("jwt"), create);
    }
}
