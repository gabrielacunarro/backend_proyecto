import assert from "assert";
import dao from "../../src/data/index.dao.js";

describe("Testing order model", () => {
    const { orders } = dao;
    const orderData = { pid: "65e669187c45f729d04ae49a", quantity: 2, uid: "65e669187c45f729d04ae49b" };
    let createdOrderId;

    before(async () => {
        const newOrder = await orders.create(orderData);
        createdOrderId = newOrder._id;
    });

    after(async () => {

        if (createdOrderId) {
            await orders.destroy(createdOrderId);
        }
    });

    it("Order creation requires an object with the property 'pid'", () => {
        assert.strictEqual(typeof orderData.pid, "string");
        assert.ok(orderData.pid.length > 0);
    });

    it("Order creation doesn't require an object with the property 'discount'", () => {
        assert.strictEqual(orderData.discount, undefined);
    });

    it("The function 'read' must return an array of orders", async () => {
        const allOrders = await orders.read({ filter: {}, orderAndPaginate: {} });
        assert(Array.isArray(allOrders.docs) && allOrders.docs.length > 0);
    });

    it("Order quantity must be a positive number", async () => {
        const invalidOrderData = { pid: "65e669187c45f729d04ae49a", quantity: -2, uid: "65e669187c45f729d04ae49b" };
        try {
            await orders.create(invalidOrderData);
        } catch (error) {
            assert.strictEqual(error.message, "quantity must be a positive number");
        }
    });

    it("The function 'readOne' must return one order", async () => {
        const oneOrder = await orders.readOne(createdOrderId, orderData.uid);
        assert.strictEqual(typeof oneOrder, "object");;
        assert.strictEqual(oneOrder.quantity.toString(), orderData.quantity.toString());
    });

    it("The function 'update' must update the order's data", async () => {
        const newData = { quantity: 5 };
        await orders.update(createdOrderId, newData);
        const updatedOrder = await orders.readOne(createdOrderId, orderData.uid);
        assert.strictEqual(updatedOrder.quantity, 5);
    });
});
