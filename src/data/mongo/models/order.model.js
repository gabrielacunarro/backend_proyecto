import { model, Schema, Types } from "mongoose";

const collection = "orders" // el plural, en minuscula y descriptivo
const schema = new Schema({
    uid: { type: Types.ObjectId, required: true, ref: "products" }, //las props q necesiten referenciar o relacionarse con otros modelos de otras collec
    //deben config como tipo ObjectID y con el atributo ref, para referenciar hacia "tal" coleccion
    pid: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: { type: String, default: "0" } // pasa lo mismo que para los roles, puedo definirlo como num o como string
    //0 reserved
    //1 paid
    //2 delivered
},
    { timestamps: true }
);


const Order = model(collection, schema);
export default Order


