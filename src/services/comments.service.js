import  comments  from "../data/mongo/comments.mongo.js"

class CommentsService {
    constructor() {
        this.model = comments
    }
    create = async (data) => await this.model.create(data)
    read = async ({ filter, orderAndPaginate }) => await this.model.read({ filter, orderAndPaginate })
    readOne = async (id) => await this.model.readOne(id)
    update = async (data) => await this.model.update(id, data)
    destroy = async (id) => await this.model.destroy(id)
}

const service = new CommentsService();
export default service