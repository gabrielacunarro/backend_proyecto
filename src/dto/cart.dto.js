import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

class CartDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.uid = data.uid;
        this.products = data.products || [];
        this.status = data.status || "active";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export default CartDTO;
