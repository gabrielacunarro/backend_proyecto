import MongoManager from "./manager.mongo.js";
import Cart from "./models/cart.model.js";

const carts = new MongoManager(Cart);
export default carts;