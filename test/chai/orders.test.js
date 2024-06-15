import { expect } from "chai";
import "dotenv/config.js";
import dao from "../../src/data/index.dao.js";

describe("Testing order model", () => {
    const { orders } = dao;
    const orderData = { pid: "65e669187c45f729d04ae49a", quantity: 2, uid: "65e669187c45f729d04ae49b" };

    it("Order creation requires an object with the property 'pid'", () => {
        expect(orderData).to.have.property("pid").that.is.a("string").with.length.above(0);
    });

    it("Order creation doesn't require an object with the property 'discount'", () => {
        expect(orderData).to.not.have.property("discount");
    });

    it("The function 'read' must return an array of orders", async () => {
        const allOrders = await orders.read({ filter: {}, orderAndPaginate: {} });
        expect(allOrders.docs).to.be.an("array").that.is.not.empty;
    });

    it("Order quantity must be a positive number", async () => {
        const invalidOrderData = { pid: "65e669187c45f729d04ae49a", quantity: -2, uid: "65e669187c45f729d04ae49b" };
        try {
            await orders.create(invalidOrderData);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include("quantity must be a positive number");
        }
    });

    it("The function 'readOne' must return one order", async () => {
        const newOrder = await orders.create(orderData);
        const oneOrder = await orders.readOne(newOrder._id);
        expect(oneOrder).to.have.property("pid");
        expect(oneOrder).to.have.property("quantity", orderData.quantity);
    });

    it("The function 'update' must update the order's data", async () => {
        const newOrder = await orders.create(orderData);
        const newData = { quantity: 5 };

        await orders.update(newOrder._id, newData);

        const updatedOrder = await orders.readOne(newOrder._id);
        expect(updatedOrder).to.have.property("quantity", 5);
    });

});
