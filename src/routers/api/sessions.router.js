import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCbMid from "../../middlewares/passCb.mid.js";
//import isAuth from "../../middlewares/isAuth.mid.js"

const sessionsRouter = Router();

//register
sessionsRouter.post("/register", has8char, passCbMid("register"), async (req, res, next) => {
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
sessionsRouter.post("/login", passCbMid("login"), async (req, res, next) => {
    try {
        return res.cookie("token", req.token, {
            maxAge: 60 * 60 * 24 * 7, httpOnly: true
        }).json({
            statusCode: 200,
            message: "Logged in!"
        });
    } catch (error) {
        return next(error);
    }
});


//signout
sessionsRouter.post("/signout", passCbMid("jwt"), async (req, res, next) => { // aca agregar isAuth
    try {
        return res.clearCookie("token").json({
            statusCode: 200,
            message: "Signed out!"
        })
    } catch (error) {
        return next(error)
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

//sigonut cb
sessionsRouter.get("/signout/cb", (req,res,next)=>{
    try {
        return res.json({
            statusCode: 400,
            message: "Already Signed Out"
        })
    } catch (error) {
        return next(error)
    }
})

//google
sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }),
);

//google cb
sessionsRouter.get("/google/cb", passport.authenticate("google", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
    try {

        res.redirect("/");

    } catch (error) {
        return next(error);
    }
});


export default sessionsRouter;