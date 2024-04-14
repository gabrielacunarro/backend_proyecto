import CustomRouter from "../CustomRouter.js";
import winston from "../../utils/logger/winston.utils.js";

export default class LoggersRouter extends CustomRouter {
    init() {
        this.router.get("/", (req, res) => {
            winston.ERROR("This is an error message");
            winston.WARN("This is a warning message");
            winston.INFO("his is an informative message");
            winston.HTTP("This is an HTTP message");

            return res.send("Logs tested successfully");
        });
    }
}




