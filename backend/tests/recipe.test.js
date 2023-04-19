const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();

const app = require("../app");

// Connecting to the database before each test.
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Closing database connection after each test.
afterEach(async () => {
    await mongoose.connection.close();
});

// TEST-CASE 1
describe("POST /api/recipe/addrecipe", () => {
    it("should add the recipe to the database", async () => {
        const token = await supertest(app).post("/api/auth/login").send({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
        });

        const response = await supertest(app)
            .post("/api/recipe/addrecipe").
            send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: ["heat water on gas"],
                ingredients: ["water"]
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": token.body.authToken,
            });

        expect(response.statusCode).toBe(201);
    });
});

// TEST-CASE 2
describe("POST /api/recipe/addrecipe (with Error)", () => {
    it("should cause error due to invalid ingredients and steps type", async () => {
        const token = await supertest(app).post("/api/auth/login").send({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
        });

        const response = await supertest(app)
            .post("/api/recipe/addrecipe").
            send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: "heat water on gas",
                ingredients: "water"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": token.body.authToken,
            });

        expect(response.statusCode).toBe(400);
    });
});


// TEST-CASE 3
describe("POST /api/recipe/fetchallrecipes", () => {
    it("should get all recipes of the user", async () => {
        const token = await supertest(app).post("/api/auth/login").send({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
        });

        const response = await supertest(app)
            .post("/api/recipe/fetchallrecipes")
            .set({
                "Content-Type": "application/json",
                "auth-token": token.body.authToken
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});


// TEST-CASE 4
describe("POST /api/recipe/fetchrecipe/:recipeId", () => {
    it("should get particular recipe", async () => {
        const token = await supertest(app).post("/api/auth/login").send({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
        });
        const recipeId = "6435901ff4f125ed274a3595"
        const response = await supertest(app)
            .post(`/api/recipe/fetchrecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": token.body.authToken
            });

        expect(response.statusCode).toBe(200);
        // expect(response.body);
    })
})