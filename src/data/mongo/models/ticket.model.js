import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    oid: {
        type: String
    }
}, { timestamps: true });

ticketSchema.plugin(mongoosePaginate);

const Ticket = model("Ticket", ticketSchema);

export default Ticket;

