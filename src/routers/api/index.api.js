import { Router } from "express"
import usersRouter from "./users.router.js"
import productsRouter from "./products.router.js"
import ordersRouter from "./order.router.js"
import sessionsRouter from "./sessions.router.js"

const apiRouter = Router()

//definir los enrutadores de los recursos
apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/orders", ordersRouter)
apiRouter.use("/sessions", sessionsRouter)

export default apiRouter;
