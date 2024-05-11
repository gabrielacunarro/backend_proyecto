import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";
const schema = new Schema(
    {
        uid: { type: Types.ObjectId, required: true, ref: "users" }, 
        products: [
            {
                pid: { type: Types.ObjectId, required: true, ref: "products" }, 
                quantity: { type: Number, default: 1 }, // Cantidad de arts
            }
        ],
        status: { type: String, enum: ["active", "inactive"], default: "active" }, // estado del carrito
    },
    { timestamps: true }
);

schema.index({ uid: 1 }, { unique: true });

schema.plugin(mongoosePaginate);
const Cart = model(collection, schema);
export default Cart;
