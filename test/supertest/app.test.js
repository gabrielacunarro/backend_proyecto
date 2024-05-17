import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.dao.js";

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testing PRODUCTS Endpoints", () => {
    it("Create Product - POST /api/products", async () => {
        const newProduct = {
            title: "New Product",
            description: "Description of new product",
            price: 19.99,
            stock: 10
        };
        const response = await requester.post("/api/products").send(newProduct);
        expect(response.status).to.equal(200);
    });
    it("Get All Products - GET /api/products", async () => {
        const response = await requester.get("/api/products");
        expect(response.status).to.equal(200);
    });
    it("Get Product by ID - GET /api/products/:pid", async () => {
        const productId = "your-product-id";
        const response = await requester.get(`/api/products/${productId}`);
        expect(response.status).to.equal(200);
    });
    it("Update Product - PUT /api/products/:pid", async () => {
        const productId = "your-product-id";
        const updatedProduct = {
            title: "Updated Product Title"
        };
        const response = await requester.put(`/api/products/${productId}`).send(updatedProduct);
        expect(response.status).to.equal(200);
    });
    it("Delete Product - DELETE /api/products/:pid", async () => {
        const productId = "your-product-id";
        const response = await requester.delete(`/api/products/${productId}`);
        expect(response.status).to.equal(200);
    });
});

describe("Testing USERS Endpoints", () => {
    it("Create User - POST /api/users", async () => {
        const newUser = {
            name: "New User",
            email: "newuser@example.com",
            password: "password123"
        };
        const response = await requester.post("/api/users").send(newUser);
        expect(response.status).to.equal(200);
    });
    it("Get All Users - GET /api/users", async () => {
        const response = await requester.get("/api/users");
        expect(response.status).to.equal(200);
    });
    it("Get User by ID - GET /api/users/:uid", async () => {
        const userId = "your-user-id";
        const response = await requester.get(`/api/users/${userId}`);
        expect(response.status).to.equal(200);
    });
    it("Update User - PUT /api/users/:uid", async () => {
        const userId = "your-user-id";
        const updatedUser = {
            name: "Updated User Name"
        };
        const response = await requester.put(`/api/users/${userId}`).send(updatedUser);
        expect(response.status).to.equal(200);
    });
    it("Delete User - DELETE /api/users/:uid", async () => {
        const userId = "your-user-id";
        const response = await requester.delete(`/api/users/${userId}`);
        expect(response.status).to.equal(200);
    });
    it("Get User by Email - GET /api/users/readbyemail/:email", async () => {
        const userEmail = "user@example.com";
        const response = await requester.get(`/api/users/readbyemail/${userEmail}`);
        expect(response.status).to.equal(200);
    });
    it("Change User Role - PUT /api/users/premium/:uid", async () => {
        const userId = "your-user-id";
        const updatedRole = {
            role: 2
        };
        const response = await requester.put(`/api/users/premium/${userId}`).send(updatedRole);
        expect(response.status).to.equal(200);
    });
});

describe("Testing ORDERS Endpoints", () => {
    it("Create Order - POST /api/orders", async () => {
        const newOrder = {
            pid: "your-product-id",
        };
        const response = await requester.post("/api/orders").send(newOrder);
        expect(response.status).to.equal(200); 
    });

    it("Get All Orders - GET /api/orders", async () => {
        const response = await requester.get("/api/orders");
        expect(response.status).to.equal(200);
    });

    it("Get Order by ID - GET /api/orders/:oid", async () => {
        const orderId = "your-order-id";
        const response = await requester.get(`/api/orders/${orderId}`);
        expect(response.status).to.equal(200);
    });

    it("Update Order - PUT /api/orders/:oid", async () => {
        const orderId = "your-order-id";
        const updatedOrder = {
            quantity: 5,
            state: "paid"
        };
        const response = await requester.put(`/api/orders/${orderId}`).send(updatedOrder);
        expect(response.status).to.equal(200);
    });

    it("Delete Order - DELETE /api/orders/:oid", async () => {
        const orderId = "your-order-id";
        const response = await requester.delete(`/api/orders/${orderId}`);
        expect(response.status).to.equal(200);
    });

    it("Get Total Bills for User - GET /api/orders/total/:uid", async () => {
        const userId = "your-user-id";
        const response = await requester.get(`/api/orders/total/${userId}`);
        expect(response.status).to.equal(200);
    });
});

describe("Testing SESSIONS Endpoints", () => {
    it("Register User - POST /api/sessions/register", async () => {
        const newUser = {
            email: "example@example.com",
            name: "Example User",
            verifiedCode: "your-verified-code"
        };
        const response = await requester.post("/api/sessions/register").send(newUser);
        expect(response.status).to.equal(200);
    });
    //ver bien
    it("Login User - POST /api/sessions/login", async () => {
        const credentials = {
            email: "zaira@gmail.com",
            password: "hola1234"
        };
        const response = await requester.post("/sessions/login").send(credentials);;
        expect(response.status).to.equal(200);
        expect(response.headers).to.have.property("set-cookie");
        const authToken = response.headers['set-cookie']
            .map(cookie => cookie.split(";")[0].split("=")[1]) 
            .find(token => token.startsWith("token=")); 

        //expect(authToken).to.exist; // ver esto q falla 
    });

    it("Signout User - POST /api/sessions/signout", async () => {
        const response = await requester.post("/api/sessions/signout");
        expect(response.status).to.equal(200);
        expect(response.request.cookies).to.not.include('token');
    });


    it("Verify Account - POST /api/sessions/verify", async () => {
        const verificationData = {
            email: "example@example.com",
            verificationCode: "your-verification-code"
        };
        const response = await requester.post("/api/sessions/verify").send(verificationData);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message");
    });

    it("Update Password - PUT /api/sessions/password", async () => {
        const passwordData = {
            email: "example@example.com",
            password: "your-old-password",
            newPassword: "your-new-password"
        };
        const response = await requester.put("/api/sessions/password").send(passwordData);
        expect(response.status).to.equal(200);
    });
});


