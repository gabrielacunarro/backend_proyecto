import CustomRouter from "../CustomRouter.js";
//import usersManager from "../../data/fs/userFS.js";
import { create, read, readOne, update, destroy, readByEmail } from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
    init() {
        
        this.create("/", ["ADMIN", "PREM"], create);
        this.read("/", ["ADMIN", "PREM"], read);
        this.read("/:uid", ["ADMIN", "PREM"], readOne);
        this.update("/:uid", ["ADMIN", "PREM"], update);
        this.destroy("/:id", ["ADMIN", "PREM"], destroy);
        this.read("/readbyemail/:email", ["ADMIN", "PREM"], readByEmail);
    }
}



