import argsUtil from "../utils/args.util.js";
console.log(argsUtil);

const environment = "dev" //argsUtil.env;

let dao = {};

switch (environment) {
    case "test":
        // Utiliza MEMORY
        console.log("MEMORY CONNECTED");
        const { default: productManager } = await import("./memory/productMemory.js");
        dao = { products: productManager };
        console.log(productManager)
        break;

    case "dev":
        // Utiliza FS
        console.log("FS CONNECTED");
        const { default: productsFs } = await import("./fs/productFS.js");
        dao = { products: productsFs };
        break;

    case "prod":
        // Utiliza MONGO
        try {
            //await dbConnection(); 
            console.log("Connected to MongoDB");

            const { default: productsMongo } = await import("./mongo/products.mongo.js");
            dao = { products: productsMongo };
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        break;

}

export default dao;
