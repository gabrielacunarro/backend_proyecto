import "dotenv/config.js";
import dbConnection from "../utils/db.js";
import winston from "../utils/logger/winston.utils.js";

const persistence = process.env.PERSISTENCE || "MONGO"

let dao = {};

switch (persistence) {
    case "MEMORY":
    //Utiliza MEMORY
    winston.INFO("MEMORY CONNECTED");
    const { default: productManager } = await import("./memory/productMemory.js");
    dao = { products: productManager };
    winston.INFO(productManager)
    break;

    case "FS":
    winston.INFO("FS CONNECTED");
    const { default: productsFs } = await import("./fs/productFS.js");
    dao = { products: productsFs };
    break;

    default:
        //"MONGO"
        dbConnection()
        const { default: ProductsMongo } = await import("./mongo/products.mongo.js");
        const { default: UsersMongo } = await import("./mongo/users.mongo.js")
        const { default: CommentsMongo } = await import("./mongo/comments.mongo.js")
        const { default: OrdersMongo } = await import("./mongo/orders.mongo.js")
        const { default: TicketsMongo } = await import("./mongo/tickets.mongo.js");
        dao = { products: ProductsMongo, users: UsersMongo, comments: CommentsMongo, orders: OrdersMongo,  tickets: TicketsMongo }
        winston.INFO("MONGO CONNECTED");
        break;

}

export default dao;
