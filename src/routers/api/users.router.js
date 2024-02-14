import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
//import usersManager from "../../data/fs/userFS.js";
import propsUsersMiddleware from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

// Middleware para validar propiedades de usuario
usersRouter.use(propsUsersMiddleware);

// Endpoint para crear los usuarios
usersRouter.post("/", async (req, res, next) => {
    try {
        const userData = req.body;
        await users.create(userData);

        return res.json({
            statusCode: 201,
            response: "User successfully created.",
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Endpoint para obtener la lista de usuarios
usersRouter.get("/", async (req, res, next) => {
    try {
        const orderAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
        }
        const filter ={}
        if (req.query.email){
            filter.email = new RegExp(req.query.email.trim(),'i')
        }
        if (req.query.name==="desc"){
            orderAndPaginate.sort.name =1
        }
        const all = await users.read({ filter, orderAndPaginate });
        
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        }
        return res.json({
            statusCode: 404,
            response: all,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Endpoint para obtener un usuario readOne(ID)
usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await users.readOne(uid);

        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
            });
        } else {
            const error = new Error(`User with ID ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

// Endpoint para actualizar un usuario por ID
usersRouter.put("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const userData = req.body;

        const isUpdated = await users.update(uid, userData);

        if (isUpdated) {
            return res.json({
                statusCode: 200,
                response: `User with ID ${uid} has been successfully updated.`,
            });
        } else {
            const error = new Error(`User with ID ${uid} not found. No user has been updated.`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

// Endpoint para eliminar un usuario por ID
usersRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await users.destroy(id);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                response: `User with ID ${id} has been successfully deleted.`,
            });
        } else {
            const error = new Error(`User with ID ${id} not found. No user has been deleted.`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
});
//endpoint para buscar un usuario por email
usersRouter.get("/readbyemail/:email", async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await users.readByEmail(email);

        if (user) {
            return res.json({
                statusCode: 200,
                ...user,  // Devuelve directamente el objeto user sin el objeto response
            });
        } else {
            return res.json({
                statusCode: 404,
                message: `User with email ${email} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});


export default usersRouter;
