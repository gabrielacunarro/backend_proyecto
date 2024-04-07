import crypto from "crypto"

class CommentDTO {
    constructor(data) {
        process.env.PERSISTENCE !== "MONGO" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.text = data.text
        this.pid = data.pid
        this.uid = data.uid
        process.env.PERSISTENCE !== "MONGO" && (this.createdAt = new Date());
        process.env.PERSISTENCE !== "MONGO" && (this.updatedAt = new Date());
    }
}

export default CommentDTO
