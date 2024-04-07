import { model, Schema, Types } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "comment";
const schema = new Schema(
    {
        text: { type: String, required: true },
        pid: { type: Types.ObjectId, ref: "products" },
        uid: { type: Types.ObjectId, ref: "users" }
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.pre("find", function () { this.populate("uid", "-password -createdAt -updatedAt -__v") })
schema.pre("find", function () { this.populate("pid", "title price") })

const Comment = model(collection, schema);
export default Comment;
