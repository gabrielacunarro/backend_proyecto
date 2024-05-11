import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

class TicketDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));

        this.user = data.user;
        this.products = data.products || [];
        this.total = data.total || 0; 
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default TicketDTO;
