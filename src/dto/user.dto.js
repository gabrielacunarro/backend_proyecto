import crypto from "crypto"
import { createHash } from "../utils/hash.util.js"

class UserDTO {
    constructor(data) {
        process.env.PERSISTENCE !== "MONGO" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.email = data.email
        this.password = createHash(data.password)
        this.role = data.role || "USER"
        process.env.PERSISTENCE !== "MONGO" && (createdAt = new Date());
        process.env.PERSISTENCE !== "MONGO" && (updatedAt = new Date());
    }
}

export default UserDTO