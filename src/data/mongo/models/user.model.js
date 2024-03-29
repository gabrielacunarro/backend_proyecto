import { model, mongo, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const collection = "users";
const schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, default: "https://imgur.com/mREdOOd" },
    age: { type: Number, default: 18 },
    role: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
}, { timestamps: true });

schema.plugin(mongoosePaginate);
const User = model(collection, schema);
export default User;

