import { expect } from "chai";
import "dotenv/config.js";
import dao from "../../src/data/index.dao.js";

describe("Testing product model", () => {
    const { products } = dao;
    const data = { title: "Laptop", description: "A high-end gaming laptop", price: 1500, role: 1 };

    it("Product creation requires an object with the property 'title'", () => {
        expect(data).to.have.property("title").that.is.a("string").with.length.above(0);
    });
    
    it("Product creation doesn't require an object with the property 'discount'", () => {
        expect(data).to.not.have.property("discount");
    });

    it("The function 'read' must return an array of products", async () => {
        const allProducts = await products.read({ filter: {}, orderAndPaginate: {} });
        expect(allProducts.docs).to.be.an("array").that.is.not.empty;
    });

    it("Product price must be a positive number", async () => {
        const productData = { title: "Tablet", description: "A new tablet", price: -100, role: 1 };
        try {
            await products.create(productData);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include("price must be a positive number");
        }
    });

    it("The function 'readOne' must return one product", async () => {
        const newProduct = await products.create(data);
        const oneProduct = await products.readOne(newProduct._id);
        expect(oneProduct).to.be.an("object");
        expect(oneProduct).to.have.property("title", "Laptop"); 
    });

    it("The function 'update' must update the product's data", async () => {
        const newProduct = await products.create(data);
        const newData = { title: "High-end Laptop" };

        await products.update(newProduct._id, newData);
        
        const updatedProduct = await products.readOne(newProduct._id);
        expect(updatedProduct).to.have.property("title", "High-end Laptop");
    });

    it("The function 'destroy' must delete the product", async () => {
        const newProduct = await products.create(data);

        await products.destroy(newProduct._id);

        try {
            await products.readOne(newProduct._id);
        } catch (error) {
            expect(error.message).to.include("Product not found");
        }
    });
});
