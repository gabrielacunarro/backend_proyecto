import assert from "assert"
import "dotenv/config.js"
import dao from "../../src/data/index.dao.js";

describe(
    "Testing user model",
    () => {
        const { users } = dao;
        const data = { name: "gabi", email: "gabi58@gmail.com", password: "hola1234" }
        it(
            " User creation requires an object with the property 'name' ",
            () => {
                assert.ok(data.name)
            }
        )
        it(
            " User creation doesnt requires an object with de property 'photo'",
            () => {
                assert.strictEqual(data.photo, undefined)
            }
        )
        it(
            "Create function returns a response  ",
            async() => {
                const response = await users.create(data)
                assert.ok(response)
            }
        )
        it("The function read it must return an array of users", async() => {
            const all = await users.read({ filter: {}, orderAndPaginate: {} })
            assert(Array.isArray(all.docs))
            }
        )
    }
)