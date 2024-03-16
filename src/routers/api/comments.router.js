import CustomRouter from "../CustomRouter.js";
import { create, read } from "../../controllers/comments.control.js";

class CommentsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREM"], create)
        this.read("/", ["PUBLIC"], read)
    }
}

let commentsRouter = new CommentsRouter
commentsRouter = commentsRouter.getRouter()

export default commentsRouter