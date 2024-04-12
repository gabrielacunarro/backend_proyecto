import { verifyToken } from "../utils/token.util.js";
import customError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

export default (req, res, next) => {
    try {
        const { role } = req.user;
        if (role === 1) {
            return next();
        } else {
            const error = customError.new(errors.forbidden);
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}