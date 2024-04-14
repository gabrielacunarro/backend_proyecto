import passport from "passport";
import winston from "../utils/logger/winston.utils.js";

export default (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            //winston.INFO({ error, user, info });
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.status(401).json({
                    statusCode: 401,
                    message: info.message || "Unauthorized",
                });
            }
            req.user = user;
            return next();
        })(req, res, next);
    };
};