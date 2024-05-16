import "dotenv/config.js"
import { expect } from "chai"
import supertest from "supertest";
import dao from "../../src/data/index.dao.js";

const requester = supertest("http://localhost:" + process.env.PORT + "/api")

describe(
    "Testing Essence Selecto API",
    () => {
        describe(
            "Testing USERS",
            () => {
                it()
                it()
                it()
                it()
            }
        )
        describe(
            "Testing PRODUCTS",
            () => {
                it()
                it()
                it()
                it()
            }
        )
        describe(
            "Testing CARTS",
            () => {
                it()
                it()
                it()
                it()
            }
        )
        describe(
            "Testing ORDERS",
            () => {
                it()
                it()
                it()
                it()
            }
        )
    }
)

