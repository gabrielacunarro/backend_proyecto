import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
    {
        uid: { type: Types.ObjectId, required: true, ref: "users" },
        pid: { type: Types.ObjectId, required: true, ref: "products" }, 
        quantity: { type: Number, default: 1 },
        state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" },
    },
    { timestamps: true }
);

//midleware pre

schema.pre("find", function () {this.populate("uid", "-password -createdAt -updatedAt -__v")})
schema.pre("find", function () {this.populate("pid", "title price")})

const Order = model(collection, schema);
export default Order;





