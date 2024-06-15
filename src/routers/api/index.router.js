import UsersRouter from "./users.router.js"
import ProductsRouter from "./products.router.js"
import OrdersRouter from "./orders.router.js"
import SessionsRouter from "./sessions.router.js"
import LoggersRouter from "./loggers.router.js";
import commentsRouter from "./comments.router.js"
import TicketsRouter from "./tickets.router.js";
import passport from "../../middlewares/passport.mid.js"
import CustomRouter from "../CustomRouter.js"

const product = new ProductsRouter();
const order = new OrdersRouter();
const session = new SessionsRouter();
const user = new UsersRouter();
const loggers = new LoggersRouter();
const tickets = new TicketsRouter();

export default class ApiRouter extends CustomRouter {
    init() {
        this.use("/users", user.getRouter())
        this.use("/products",  product.getRouter())
        this.use("/orders", passport.authenticate("jwt", { session: false, failureRedirect: "/api/sessions/badauth" }), order.getRouter())
        this.use("/sessions", session.getRouter())
        this.use("/comments", commentsRouter)
        this.use("/loggers", loggers.getRouter())
        this.use("/tickets", tickets.getRouter())
    }
}



