import { config } from "dotenv";
config({ path: ".env.dev" });

import { connect } from "mongoose"

export default async function dbConnection() {
    try {
        console.log("Valor de DB_LINK:", process.env.DB_LINK);
        await connect(process.env.DB_LINK)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}




