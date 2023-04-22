const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();

const app = require("../app");

const EMAIL = "testuser01@example.com";
const PASSWORD = "testpassword";
let AUTH_TOKEN = null;
const INVALID_DATA_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0M2FjOWY1NWVlNjYxODZlYTY1ODBiIn0sImlhdCI6MTY4MjE1NjcwM30.gB3zacXMVQnmZC_hSTh2-LcmAsjWOySyjHt4OAr78OU";
const INVALID_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDAwMCJ9LCJpYXQiOjE2ODIxNTYzNTB9.BTIM0S7_IvbrVB7NhPKbqJd7u2sr4txREL_lkbzl8YU";

// Connecting to the database before each test.
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Closing database connection after each test.
afterEach(async () => {
    await mongoose.connection.close();
});

// END-POINT 1: TEST CASES 1-4
describe("POST /api/auth/createuser", () => {
    it("should create a new user and return an authentication token", async () => {
        const user = {
            name: "Test User",
            username: "TestUser@01",
            email: EMAIL,
            password: PASSWORD,
            hasPremium: true,
        };

        const response = await supertest(app)
            .post("/api/auth/createuser")
            .send(user);

        AUTH_TOKEN = response.body.authToken;
        expect(response.status).toBe(201);
        expect(response.body.authToken).toBeDefined();
    });

    it("should return error as user already exists", async () => {
        const user = {
            name: "Test User",
            username: "TestUser@01",
            email: EMAIL,
            password: PASSWORD,
            hasPremium: true,
        };

        const response = await supertest(app)
            .post("/api/auth/createuser")
            .send(user);

        expect(response.status).toBe(400);
    });

    it("should fail due to invalid user-details format", async () => {
        const user = {
            name: "",
            username: "TestUser@02e2312312",
            email: "",
            password: PASSWORD,
            hasPremium: true,
        };

        const response = await supertest(app)
            .post("/api/auth/createuser")
            .send(user);

        expect(response.status).toBe(400);
    });

    it("should fail due to missing user-details", async () => {
        const user = {};

        const response = await supertest(app)
            .post("/api/auth/createuser")
            .send(user);

        expect(response.status).toBe(400);
    });
});

// END-POINT 2: TEST CASES 5-7
describe("POST /api/auth/login", () => {
    it("should log a user in", async () => {
        const response = await supertest(app).post("/api/auth/login").send({
            email: EMAIL,
            password: PASSWORD,
        });

        expect(response.status).toBe(200);
        expect(response.body.authToken).toBeDefined();
    });

    it("should not login a user due to invalid email", async () => {
        const response = await supertest(app).post("/api/auth/login").send({
            email: "randomWrongemail@incorrect.email",
            password: PASSWORD,
        });
        expect(response.status).toBe(400);
        expect(response.body.authToken).toBe(undefined);
        expect(response.body.errors).toBeDefined();
    });

    it("should not login a user due to invalid password", async () => {
        const response = await supertest(app)
            .post("/api/auth/login")
            .send({
                email: EMAIL,
                password: PASSWORD + "sv",
            });
        expect(response.status).toBe(400);
        expect(response.body.authToken).toBe(undefined);
        expect(response.body.errors).toBeDefined();
    });
});

// END-POINT 3: TEST-CASES 8-10
describe("POST /api/auth/getprofile", () => {
    it("should fetch loggedin user's profile", async () => {
        const response = await supertest(app)
            .post("/api/auth/getprofile")
            .set({ "auth-token": AUTH_TOKEN });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe(EMAIL);
    });
    it("should return error due to invalid data in auth-token", async () => {
        const response = await supertest(app)
            .post("/api/auth/getprofile")
            .set({ "auth-token": INVALID_DATA_TOKEN });

        expect(response.status).toBe(400);
        expect(response.body.email).toBe(undefined);
    });
    it("should return error due to invalid auth-token", async () => {
        const response = await supertest(app)
            .post("/api/auth/getprofile")
            .set({ "auth-token": INVALID_TOKEN });

        expect(response.status).toBe(401);
        expect(response.body.email).toBe(undefined);
    });
});

// END-POINT 7: TEST-CASES
describe("DELETE /api/auth/delete", () => {
    it("should delete a user from auth-token", async () => {
        const response = await supertest(app)
            .delete("/api/auth/delete")
            .set({ "auth-token": AUTH_TOKEN });

        expect(response.status).toBe(204);
    });

    it("should return error due to missing auth-token", async () => {
        const response = await supertest(app).delete("/api/auth/delete");

        expect(response.status).toBe(401);
    });

    it("should return error due to invalid user-id inside auth-token", async () => {
        const response = await supertest(app)
            .delete("/api/auth/delete")
            .set({ "auth-token": INVALID_DATA_TOKEN });

        expect(response.status).toBe(401);
    });

    it("should return error due to invalid auth-token", async () => {
        const response = await supertest(app)
            .delete("/api/auth/delete")
            .set({ "auth-token": INVALID_TOKEN });

        expect(response.status).toBe(401);
    });
});
