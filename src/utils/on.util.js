import winston from "./logger/winston.utils.js";

process.on("exit", (code) => winston.INFO("The process exited with code " + code));

process.on("uncaughtException", (error) => winston.ERROR("An error occurred: " + error.message));

winston.INFO("Process ID:", process.pid);

process.exit(1);


