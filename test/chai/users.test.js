import { expect } from "chai"
import "dotenv/config.js"
import dao from "../../src/data/index.dao.js";

describe("Testing user model", () => {
    const { users } = dao;
    const data = { name: "gabi", email: "gabi58@gmail.com", password: "hola1234" };

    it("User creation requires an object with the property 'name'", () => {
        expect(data).to.have.property("name");
    });
    it(" User creation doesnt requires an object with de property 'photo'",() => {
            expect(data).not.to.have.property("photo")
        });
    it("The function read it must return an array of users", async () => {
        const all = await users.read({ filter: {}, orderAndPaginate: {} })
        expect(Array.isArray(all.docs)).to.be.true;
    });
});

