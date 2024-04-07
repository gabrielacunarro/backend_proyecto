import CommentDTO from "../dto/comment.dto.js"
import dao from "../data/index.dao.js"

const { comments } = dao

class CommentsRep {
    constructor() {
        this.model = comments;
    }
    create = async (data) => await this.model.create(new CommentDTO(data));
    read = async ({ filter, orderAndPaginate }) => await this.model.read({ filter, orderAndPaginate })
    readOne = async (id) => await this.model.readOne(id)
    update = async (id, data) => await this.model.update(id, data)
    destroy = async (id) => await this.model.destroy(id)
}

const commentsRepository = new CommentsRep();
export default commentsRepository