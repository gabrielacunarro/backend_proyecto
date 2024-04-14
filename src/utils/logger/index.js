const persistence = process.env.PERSISTENCE || "PROD"

let logger;

switch (persistence) {
    case "PROD":
    const {default: winstonProd} = await import("./winston.utils.js");
    logger = winstonProd
    break;

    default:
        const {default: winstonDev} = await import("./winstonDev.utils.js");
        logger = winstonDev
        break;

}

export default logger;
