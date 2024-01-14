import { Router } from "express"
import usersManager from "../../data/fs/userFS.js";
import propsUsersMiddleware from "../../middlewares/propsUsers.mid.js";  

const usersRouter = Router()


// Middleware para validar propiedades de usuario
usersRouter.use(propsUsersMiddleware);

//definir los endpoints (POST GET PUT DELETE)

// Endpoint para crear los usuarios
usersRouter.post("/", async (req, res) => {
    try {
        const userData = req.body;
        await usersManager.create(userData);

        return res.json({
            statusCode: 201,
            response: "User successfully created.",
        });
    } catch (error) {
        console.error(error);
        return res.json({
            statusCode: 500,
            response: error.message,
        });
    }
})

// Endpoint para obtener la lista de usuarios
usersRouter.get("/", async (req, res,next) => {
    try {
        const userList = usersManager.read();

        if (userList.length > 0) {
            return res.json({
                statusCode: 200,
                response: userList,
            });
        } else {
            return res.json({
                statusCode: 400,
                response: "Users not found",
            });
        }
    } catch (error) {
        console.error(error);
        return next(error)
    }
})

// Endpoint para obtener un usuario readOne(ID)
usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;

        const user = usersManager.readOne(uid);

        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: "User not found",
            });
        }
    } catch (error) {
        return next(error);
    }
});



// Endpoint para actualizar un usuario por ID
usersRouter.put("/:uid", async (req, res,next) => {
    try {
        const { uid } = req.params; // Cambiado de { id } a { uid }
        const userData = req.body;

        const isUpdated = usersManager.update(uid, userData);

        if (isUpdated) {
            return res.json({
                statusCode: 200,
                response: `User with ID ${uid} has been successfully updated.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `User with ID ${uid} not found. No user has been updated.`,
            });
        }
    } catch (error) {
        return next(error)
    }
})

// Endpoint para eliminar un usuario por ID
usersRouter.delete("/:id", async (req, res,next) => {
    try {
        const { id } = req.params;
        const isDeleted = usersManager.destroy(id);

        if (isDeleted) {
            return res.json({
                statusCode: 200,
                response: `User with ID ${id} has been successfully deleted.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `User with ID ${id} not found. No user has been deleted.`,
            });
        }
    } catch (error) {
        return next(error)
    }
})

export default usersRouter