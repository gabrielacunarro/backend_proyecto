import crypto from "crypto"
import { createHash } from "../utils/hash.util.js"

class UserDTO {
    constructor(data) {
        if (process.env.PERSISTENCE !== "MONGO") {
            this._id = crypto.randomBytes(12).toString("hex");
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
        this.name = data.name;
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || "0";
        this.verified = data.verified || false;
        this.verifiedCode = data.verifiedCode || crypto.randomBytes(12).toString("base64")
    }
}

export default UserDTO;
