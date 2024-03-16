import ApiRouter from "./api/index.router.js";
import CustomRouter from "./CustomRouter.js";
import ViewsRouter from "./views/index.view.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter()

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
        this.use("/", viewsRouter)
    }
}