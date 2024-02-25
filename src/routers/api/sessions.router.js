import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post("/register", has8char, passport.authenticate("register", { session: false, failureRedirect: "/api/sessions/badauth", }), async (req, res, next) => {
    try {
        return res.json({
            statusCode: 201,
            message: "Registered!"
        })
    } catch (error) {
        return next(error)
    }
})

//login
sessionsRouter.post("/login", passport.authenticate("login", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
    try {
        return res.json({
            statusCode: 200,
            message: "Logged in!",
            token: req.token,
        });
    } catch (error) {
        return next(error);
    }
});


//signout
sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        if (req.session.email) {
            req.session.destroy();
            return res.json({
                statusCode: 200,
                message: "Signed out!",
            });
        } else {
            const error = new Error("No Auth");
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
});


sessionsRouter.get("/badauth", (req, res, next) => {
    try {
        return res.json({
            statusCode: 401,
            message: "Bad auth"
        })
    } catch (error) {
        return next(error)
    }
})

//google
sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }), // SOLO PARA PROBAR
);

//google cb
sessionsRouter.get("/google/cb", passport.authenticate("google", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
    try {
        return res.json({
            statusCode: 200,
            message: "Logged in with Google!",
            session: req.session,
        });
    } catch (error) {
        return next(error);
    }
});


export default sessionsRouter;