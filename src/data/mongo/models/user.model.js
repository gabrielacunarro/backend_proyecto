import { model, mongo, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const collection = "users";
const schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: "https://imgur.com/mREdOOd" },
    age: { type: Number, default: 18 },
    role: { type: Number, enum: [0, 1, 2], default: 0 },
    verified: { type: Boolean, default: false },
    verifiedCode: { type: String }
}, { timestamps: true });

schema.plugin(mongoosePaginate);
const User = model(collection, schema);
export default User;

