import winston from "../utils/logger/index.js"

export default (req, res, next) =>{
    winston.INFO(`${req.method}${req.url} not found path`)
    return res.json({
        statusCode: 404,
        message: `${req.method} ${req.url} not found path`
    })
}
