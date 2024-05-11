import MongoManager from "./manager.mongo.js";
import Ticket from "./models/ticket.model.js";

const tickets = new MongoManager(Ticket);
export default tickets;