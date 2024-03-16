import service from "../services/comments.service.js";

class CommentsController {
    constructor() {
        this.service = service
    }

    create = async (req, res, next) => {
        try {
            const data = req.body;
            data.uid = req.user.uid;
            const one = await this.service.create(data);
            return res.success201(one);
        } catch (error) {
            return next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            const filter = {};
            const orderAndPaginate = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
            };
            if (req.query.uid) {
                filter.uid = req.query.uid;
            }
            const all = await this.service.read({ filter, orderAndPaginate });
            return res.success200(all);
        } catch (error) {
            return next(error);
        }
    };
}

export default CommentsController;

const controller = new CommentsController();
const { create, read } = controller;
export { create, read };
