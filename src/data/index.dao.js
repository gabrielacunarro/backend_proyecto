import "dotenv/config.js";
import dbConnection from "../utils/db.js";

const persistence = process.env.PERSISTENCE || "MONGO"

let dao = {};

switch (persistence) {
    case "MEMORY":
        // Utiliza MEMORY
        // console.log("MEMORY CONNECTED");
        // const { default: productManager } = await import("./memory/productMemory.js");
        // dao = { products: productManager };
        // console.log(productManager)
        // break;

    case "FS":
        // Utiliza FS
        // console.log("FS CONNECTED");
        // const { default: productsFs } = await import("./fs/productFS.js");
        // dao = { products: productsFs };
        // break;

    default:
         //"MONGO"
        dbConnection()
        const { default: ProductsMongo } = await import("./mongo/products.mongo.js");
        const { default: UsersMongo } = await import("./mongo/users.mongo.js")
        const { default: CommentsMongo } = await import("./mongo/comments.mongo.js")
        dao = { products: ProductsMongo, users: UsersMongo, comments: CommentsMongo }
        console.log("MONGO CONNECTED");
        break;

}

export default dao;
