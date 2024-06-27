import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args;
const path = env === "prod" ? "./.env.dev" : env === "dev" ? "./.env.dev" : "./.env.test";

config({ path });

export default {
    PORT: process.env.PORT,
    DB_LINK: process.env.DB_LINK,
    SECRET: process.env.SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_EXPIRATION_TIME: 604800,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_PASS: process.env.GOOGLE_PASS,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};

