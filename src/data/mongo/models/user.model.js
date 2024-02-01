import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, default: "https://imgur.com/mREdOOd" },
    age: { type: Number, default: 18 },
    role: { type: Number, default: 0 }
}, { timestamps: true });

const User = model(collection, schema);
export default User;

