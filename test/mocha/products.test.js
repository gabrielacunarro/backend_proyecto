// import assert from "assert";
// import "dotenv/config.js";
// import dao from "../../src/data/index.dao.js";

// describe("Testing product model", () => {
//     const { products } = dao;
//     const data = { title: "Laptop", description: "A high-end gaming laptop", price: 1500, role: 1 };

//     it("Product creation requires an object with the property 'title'", () => {
//         assert.strictEqual(typeof data.title, "string");
//         assert.ok(data.title.length > 0);
//     });

//     it("Product creation doesn't require an object with the property 'discount'", () => {
//         assert.strictEqual(data.discount, undefined);
//     });

//     it("Create function returns a response", async () => {
//         const response = await products.create(data);
//         assert.ok(response); 
//     });

//     it("The function 'read' must return an array of products", async () => {
//         const allProducts = await products.read({ filter: {}, orderAndPaginate: {} });
//         assert(Array.isArray(allProducts.docs) && allProducts.docs.length > 0);
//     });

//     it("Product price must be a positive number", async () => {
//         const invalidProductData = { title: "Tablet", description: "A new tablet", price: -100, role: 1 };
//         try {
//             await products.create(invalidProductData);
//         } catch (error) {
//             assert.strictEqual(error.message, "Product price must be a positive number");
//         }
//     });

//     it("The function 'readOne' must return one product", async () => {
//         const newProduct = await products.create(data);
//         const oneProduct = await products.readOne(newProduct._id);
//         assert.strictEqual(typeof oneProduct, "object");
//         assert.strictEqual(oneProduct.title, "Laptop");
//     });

//     it("The function 'update' must update the product's data", async () => {
//         const newProduct = await products.create(data);
//         const newData = { title: "High-end Laptop" };
        
//         await products.update(newProduct._id, newData);
        
//         const updatedProduct = await products.readOne(newProduct._id);
//         assert.strictEqual(updatedProduct.title, "High-end Laptop");
//     });

//     it("The function 'destroy' must delete the product", async () => {
//         const newProduct = await products.create(data);

//         await products.destroy(newProduct._id);

//         try {
//             await products.readOne(newProduct._id);
//         } catch (error) {
//             assert.strictEqual(error.message, "Product not found");
//         }
//     });
// });
