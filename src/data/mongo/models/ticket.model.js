import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "tickets";
const schema = new Schema(
    {
        user: { type: Types.ObjectId, required: true, ref: "users" }, 
        products: [
            {
                pid: { type: Types.ObjectId, required: true, ref: "products" }, 
                quantity: { type: Number, default: 1 } 
            }
        ],
        total: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

schema.index({ user: 1 });

schema.plugin(mongoosePaginate);

const Ticket = model(collection, schema);
export default Ticket;
