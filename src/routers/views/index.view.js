import CustomRouter from "../CustomRouter.js";
import { products } from "../../data/mongo/manager.mongo.js";
import productsRouter from "../views/products.view.js";
import OrdersViewRouter from "../views/orders.view.js";
import sessionsRouter from "../views/sessions.view.js";

export default class ViewsRouter extends CustomRouter {
    init() {
        this.router.use("/products", productsRouter);
        this.router.use("/orders", OrdersViewRouter);
        this.router.use("/sessions", sessionsRouter);
        this.read("/", ["PUBLIC"],async (req, res, next) => {
            try {
                const orderAndPaginate = {
                    limit: req.query.limit || 10,
                    page: req.query.page || 1,
                    sort: { title: 1 },
                    lean: true
                }
                const filter = {}
                if (req.query.title) {
                    filter.title = new RegExp(req.query.title.trim(), 'i')
                }
                if (req.query.title === "desc") {
                    orderAndPaginate.sort.title = 1
                }
                const all = await products.read({ filter, orderAndPaginate });

                if (all && Array.from(all.docs).length > 0) {
                    return res.render( 'layouts/index', { products: all });
                }
                return res.json({
                    statusCode: 404,
                    response: all,
                })
            } catch (error) {
                console.error(error);
                next(error);
            }
        })
    }
}


