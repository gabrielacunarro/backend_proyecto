import CustomRouter from "../CustomRouter.js";
import passCbMid from "../../middlewares/passCb.mid.js";
import { createTicket } from "../../controllers/tickets.controller.js";

export default class TicketsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREM"], passCbMid("jwt"), createTicket);
    }
}
