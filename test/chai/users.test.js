// import { expect } from "chai";
// import "dotenv/config.js";
// import dao from "../../src/data/index.dao.js";

// describe("Testing user model", () => {
//     const { users } = dao;
//     const data = { name: "gabi", email: "gabi58@gmail.com", password: "hola1234" };

//     it("User creation requires an object with the property 'name'", () => {
//         expect(data).to.have.property("name").that.is.a("string").with.length.above(0);
//     });
//     it("User creation doesn't require an object with the property 'photo'", () => {
//         expect(data).to.not.have.property("photo");
//     });
//     it("The function 'read' must return an array of users", async () => {
//         const allUsers = await users.read({ filter: {}, orderAndPaginate: {} });
//         expect(allUsers.docs).to.be.an("array").that.is.not.empty;
//     });
//     it("Password must be at least 8 characters long", async () => {
//         const userData = { name: "Johnny", email: "johnny23@example.com", password: "12345673" };
//         try {
//             await users.create(userData);
//         } catch (error) {
//             expect(error).to.be.an.instanceOf(Error);
//             expect(error.message).to.equal("Password must be at least 8 characters long");
//         }
//     });
//     it("The function 'readOne' must return one user", async () => {
//         const uid = "65e669187c45f729d04ae49a"; 
//         const oneUser = await users.readOne(uid);
//         expect(oneUser).to.be.an("object");
//         expect(oneUser).to.have.property("name", "Gaabii"); 
//     });
//     it("The function 'update' must update the user's data ", async () => {
//         const uid = "65e669187c45f729d04ae49a"; 
//         const newData = { name: "Gabi" };

//         const isUpdated = await users.update(uid, newData);

//         expect(isUpdated).to.be.true;
//     });
// });

