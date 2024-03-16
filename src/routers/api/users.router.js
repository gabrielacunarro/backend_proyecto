import { users } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy,readByEmail } from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
    init() {

        // Endpoint para crear los usuarios
        this.create("/", create);
        // Endpoint para obtener la lista de usuarios
        this.read("/", read);
        // Endpoint para obtener un usuario readOne(ID)
        this.read("/:uid", readOne);
        // Endpoint para actualizar un usuario por ID
        this.update("/:uid", update);
        // Endpoint para eliminar un usuario por ID
        this.destroy("/:id", destroy);
        //endpoint para buscar un usuario por email
        this.read("/readbyemail/:email", readByEmail);
    }
}



