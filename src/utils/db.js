import { config } from "dotenv";
import winston from "./logger/winston.utils.js";
config({ path: ".env.dev" });

import { connect } from "mongoose"

export default async function dbConnection() {
    try {
        await connect(process.env.DB_LINK)
        winston.INFO("database connected")
    } catch (error) {
        winston.ERROR("Error connecting to database: " + error.message);
    }
}




