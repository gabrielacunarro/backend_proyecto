import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";

const authRouter = Router();

//register
authRouter.post("/register",has8char, async(req,res,next)=>{
    try {
        const data = req.body
        await users.create(data)
        return res.json({
            statusCode: 201,
            message: "Registered!"
        })
    } catch (error) {
        return next(error)
    }
})

authRouter.post("/login",isValidPass, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password === "hola1234") {
            req.session.email = email;
            req.session.role="user";

            return res.json({
                statusCode: 200,
                message: "Logged in!",
                session: req.session,
            });
        }
        const error = new Error("Bad Auth");
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next(error);
    }
});

authRouter.post("/signout", async (req, res, next) => {
    try {
        // Verificar si req.auth está definido y contiene la propiedad 'email'
        if (req.session && req.session.email) {
            // Eliminar req.auth
            delete req.session;
            return res.json({
                statusCode: 200,
                message: "Signed out!"
            });
        }
        const error = new Error("Bad Auth");
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next(error);
    }
});

export default authRouter;