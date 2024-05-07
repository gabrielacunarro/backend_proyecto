import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

class OrderDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")) ; 
        this.uid = data.uid;
        this.pid = data.pid;
        this.quantity = data.quantity || 1;
        this.state = data.state || "reserved";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default OrderDTO;

