import argsUtil from "../utils/args.util.js";
import crypto from "crypto"
import { model, Schema, Types } from "mongoose";

class ProductDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString('hex'));
        this.title = data.title,
            this.description = data.description,
            this.photo = data.photo || "https://i.imgur.com/uTunKIb.png",
            this.price = data.price || 10,
            this.stock = data.stock || 50,
            this.date = data.date || new Date(),
            this.owner_id = new Types.ObjectId(data.owner_id),
            this.role = data.role
            argsUtil.env !== "prod" && (this.updatedAt = new Date()),
            argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default ProductDTO