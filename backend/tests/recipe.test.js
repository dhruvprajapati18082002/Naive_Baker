const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();

const app = require("../app");

let EMAIL = "testuser02@example.com";
let PASSWORD = "testpassword";
let AUTH_TOKEN = null;

// Connecting to the database before each test.
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const token = await supertest(app).post("/api/auth/createuser").send({
        name: "Test User",
        username: "TestUser@02",
        email: EMAIL,
        password: PASSWORD,
        hasPremium: true,
    });

    AUTH_TOKEN = await token.body.authToken;
});

// Closing database connection after each test.
afterAll(async () => {
    const response = await supertest(app).delete("/api/auth/delete").set({
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN
    });
    
    await mongoose.connection.close();
});

// TEST-CASE 1
describe("POST /api/recipe/addrecipe", () => {
    it("should add the recipe to the database", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: ["heat water on gas"],
                ingredients: ["water"],
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(201);
    });
});

// TEST-CASE 2
describe("POST /api/recipe/addrecipe (with Error)", () => {
    it("should cause error due to invalid ingredients and steps type", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: "heat water on gas",
                ingredients: "water",
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(400);
    });
});

// TEST-CASE 3
describe("POST /api/recipe/fetchallrecipes", () => {
    it("should get all recipes of the user", async () => {
        const response = await supertest(app)
            .post("/api/recipe/fetchallrecipes")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

// TEST-CASE 4
describe("POST /api/recipe/fetchrecipe/:recipeId", () => {
    it("should get fetch a single recipe based on the ID", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes
        let response = await supertest(app)
            .post("/api/recipe/fetchallrecipes")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        const recipeId = response.body[0]._id;

        response = await supertest(app)
            .post(`/api/recipe/fetchrecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(200);
    });
});
