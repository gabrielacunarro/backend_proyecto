import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = { FATAL: 0, ERROR: 1,WARN:2, INFO: 3, HTTP: 4 }

const colors = { FATAL: "red", ERROR: "blue", WARN: "CYAN",INFO: "green", HTTP: "yellow" }
addColors(colors);

export default createLogger({
    levels,
    format: colorize(),
    transports: [
        new transports.Console({
            level: "HTTP", format: simple(),
        }),
        new transports.File({
            level: "ERROR", format: simple(), filename: "./src/utils/errors/erros.log",
        }),
    ],
});
