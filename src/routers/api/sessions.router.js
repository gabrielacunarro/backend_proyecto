import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCbMid from "../../middlewares/passCb.mid.js";
import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter {
    init() {
        //register
        this.create("/register", ["PUBLIC"], has8char, passCbMid("register"), async (req, res, next) => {
            try {
                return res.success201("Registered!");
            } catch (error) {
                return next(error)
            }
        })

        //login
        this.create("/login", ["PUBLIC"], passCbMid("login"), async (req, res, next) => {
            try {

                return res.cookie("token", req.token, {
                    maxAge: 60 * 60 * 24 * 7, httpOnly: true
                }).success200("Logged in!");
            } catch (error) {
                return next(error);
            }
        });

        //signout
        this.create("/signout", ["USER", "ADMIN", "PREM"], passCbMid("jwt"), async (req, res, next) => {
            try {
                return res.clearCookie("token").success200("Signed out!");
            } catch (error) {
                return next(error)
            }
        });

        this.read("/badauth", (req, res, next) => {
            try {
                return res.error401("Bad auth");
            } catch (error) {
                return next(error)
            }
        })

        //sigonut cb
        this.read("/signout/cb", (req, res, next) => {
            try {
                return res.error400("Already Signed Out");
            } catch (error) {
                return next(error)
            }
        })

        //google
        this.read("/google", passport.authenticate("google", { scope: ["email", "profile"] }),
        );

        //google cb
        this.read("/google/cb", passport.authenticate("google", { session: false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
            try {

                res.redirect("/");

            } catch (error) {
                return next(error);
            }
        });

        this.create("/", ["ADMIN", "USER"], passCbMid("jwt"), async (req, res, next) => {
            try {
                return res.success200({ session: { role: req.session.role } });
            } catch (error) {
                return next(error);
            }
        });
    }
}

