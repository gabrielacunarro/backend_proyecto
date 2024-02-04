import { model, Schema } from "mongoose";

const collection = "products" // en plural, en minuscula y descriptivo
const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    photo: { type: String, default: "ver" },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 }

},
    { timestamps: true }
);

const Product = model(collection, schema);
export default Product