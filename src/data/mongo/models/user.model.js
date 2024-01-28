import { model, Schema } from "mongoose";

const collection = "users"; // el plural, en minúscula y descriptivo
const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //unique para que no se pueda repetir email
    photo: { type: String, default: "https://imgur.com/mREdOOd" },
    age: { type: Number, default: 18 },
    role: { type: Number, default: 0 } // rol por numero, 0 usuario comun, 1 admin, 2 premium
    // date: { type: Date, default: new Date() }
},
    { timestamps: true });

const User = model(collection, schema);
export default User;
