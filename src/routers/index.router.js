import ApiRouter from "./api/index.router.js";
import CustomRouter from "./CustomRouter.js";
import ViewsRouter from "./views/index.view.js";
import SimplexRouter from '../routers/api/simplex.router.js';
import ComplexRouter from '../routers/api/complex.router.js';

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter()
const simplexRouter = new SimplexRouter;
const complexRouter = new ComplexRouter;

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter);
        this.use("/", viewsRouter);
        this.use('/simplex', simplexRouter.getRouter());
        this.use('/complex', complexRouter.getRouter());
    }
}