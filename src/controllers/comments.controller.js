import service from "../services/comments.services.js";

class CommentsController {
    constructor() {
        this.service = service
    }

    create = async (req, res, next) => {
        try {
            const data = req.body;
            data.uid = req.user._id;
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

    readOne = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const one = await this.service.readOne(cid)
            return res.success200(one)
        } catch (error) {
            return next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const data = req.body;
            const response = await this.service.update(cid, data);
            return res.success200(response);
        } catch (error) {
            return next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.service.destroy(cid);
            return res.success200(response);
        } catch (error) {
            return next(error);
        }
    };

}

export default CommentsController;

const controller = new CommentsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
