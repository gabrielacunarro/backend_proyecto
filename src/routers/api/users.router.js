import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
//import usersManager from "../../data/fs/userFS.js";
import propsUsersMiddleware from "../../middlewares/propsUsers.mid.js";
import CustomRouter from "../CustomRouter.js";

export default class UsersRouter extends CustomRouter {
    init() {

        // Middleware para validar propiedades de usuario
        this.use(propsUsersMiddleware);

        // Endpoint para crear los usuarios
        this.create("/", async (req, res, next) => {
            try {
                const userData = req.body;
                await users.create(userData);

                return res.success201("User successfully created.");
            } catch (error) {
                console.error(error);
                next(error);
            }
        });

        // Endpoint para obtener la lista de usuarios
        this.read("/", async (req, res, next) => {
            try {
                const orderAndPaginate = {
                    limit: req.query.limit || 10,
                    page: req.query.page || 1,
                }
                const filter = {}
                if (req.query.email) {
                    filter.email = new RegExp(req.query.email.trim(), 'i')
                }
                if (req.query.name === "desc") {
                    orderAndPaginate.sort.name = 1
                }
                const all = await users.read({ filter, orderAndPaginate });

                if (all.length > 0) {
                    return res.success200(all);
                }
                return res.error404(all);
            } catch (error) {
                console.error(error);
                next(error);
            }
        });

        // Endpoint para obtener un usuario readOne(ID)
        this.read("/:uid", async (req, res, next) => {
            try {
                const { uid } = req.params;
                const user = await users.readOne(uid);

                if (user) {
                    return res.success200(user);
                } else {
                    return res.error404(`User with ID ${uid} not found`);
                }
            } catch (error) {
                next(error);
            }
        });

        // Endpoint para actualizar un usuario por ID
        this.update("/:uid", async (req, res, next) => {
            try {
                const { uid } = req.params;
                const userData = req.body;

                const isUpdated = await users.update(uid, userData);

                if (isUpdated) {
                    return res.success200(`User with ID ${uid} has been successfully updated.`);
                } else {
                    return res.error404(`User with ID ${uid} has been successfully updated.`);
                }
            } catch (error) {
                next(error);
            }
        });

        // Endpoint para eliminar un usuario por ID
        this.destroy("/:id", async (req, res, next) => {
            try {
                const { id } = req.params;
                const isDeleted = await users.destroy(id);

                if (isDeleted) {
                    return res.success200(`User with ID ${id} has been successfully deleted.`);
                } else {
                    return res.error404(`User with ID ${id} has been successfully deleted.`);
                }
            } catch (error) {
                next(error);
            }
        });
        //endpoint para buscar un usuario por email
        this.read("/readbyemail/:email", async (req, res, next) => {
            try {
                const { email } = req.params;
                const user = await users.readByEmail(email);

                if (user) {
                    return res.success200(user);
                } else {
                    return res.error404(`User with email ${email} not found`);
                }
            } catch (error) {
                next(error);
            }
        });
    }
}



