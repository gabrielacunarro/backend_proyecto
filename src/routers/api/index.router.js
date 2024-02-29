import { Router } from "express"
import usersRouter from "./users.router.js"
import productsRouter from "./products.router.js"
import ordersRouter from "./orders.router.js"
import sessionsRouter from "./sessions.router.js"
import passport from "../../middlewares/passport.mid.js"

const apiRouter = Router()

//definir los enrutadores de los recursos
apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/orders", passport.authenticate("jwt",{session: false, failureRedirect: "/api/sessions/badauth"}), ordersRouter) // proteje todas las rutas de ordenes
apiRouter.use("/sessions", sessionsRouter)

export default apiRouter;
