import jwt from "jsonwebtoken";

//ingresa un obj devuelve un token
function createToken(data) {
    const expiresIn = process.env.TOKEN_EXPIRATION_TIME || 60 * 60 * 24 * 7; 
    const token = jwt.sign(
        data,
        process.env.SECRET,
        { expiresIn }
    )
    return token
}

function verifyToken(token) {
    if (token) {
        const data = jwt.verify(token, process.env.SECRET);
        return data;
    }
    const error = new Error("bad auth token")
    error.statusCode = 401
    throw error;
}

export { createToken, verifyToken }


