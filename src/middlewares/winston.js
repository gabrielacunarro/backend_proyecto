import logger from "../utils/logger/winston.utils.js"

function winston(req, res, next) {
    try {
        req.logger = logger
        const message = `${req.method} ${req.url} - ${new Date().toLocaleTimeString()} `
        req.logger.HTTP(message)
        return next()
    } catch (error) {
        return next(error)
    }
}

export default winston;