import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js";
import { createTicket, calculateTotal } from "../../controllers/tickets.controller.js";

export default class TicketsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREM"], passCbMid("jwt"), createTicket);
        this.read("/", ["USER", "PREM"], calculateTotal);
    }
}
