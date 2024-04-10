import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products" // en plural, en minuscula y descriptivo
const schema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String },
    photo: { type: String, default: "https://i.imgur.com/uTunKIb.png" },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 }

},
    { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product