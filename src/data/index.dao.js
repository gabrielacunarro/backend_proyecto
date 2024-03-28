import dbConnection from "../utils/db.js";

const persistence = process.env.PERSISTENCE || "MONGO"

let dao = {};

switch (persistence) {
    case "dev":
        // Utiliza MEMORY
        console.log("MEMORY CONNECTED");
        const { default: productManager } = await import("./memory/productMemory.js");
        dao = { products: productManager };
        console.log(productManager)
        break;

    case "test":
        // Utiliza FS
        console.log("FS CONNECTED");
        const { default: productsFs } = await import("./fs/productFS.js");
        dao = { products: productsFs };
        break;

    default:
        dbConnection()
        const { default: ProductsMongo } = await import("./mongo/products.mongo.js");
        const { default: UsersMongo } = await import("./mongo/users.mongo.js")
        dao = { products: ProductsMongo, users: UsersMongo }
        break;

}

export default dao;
