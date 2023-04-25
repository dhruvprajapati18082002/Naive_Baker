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
    await supertest(app).delete("/api/auth/delete").set({
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
    });

    await mongoose.connection.close();
});

// END-POINT 1: TEST CASES 1-4
describe("POST /api/recipe/addrecipe", () => {
    it("should add the recipe to the database", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: ["heat water on gas"],
                ingredients: ["water"],
                minutesToCook: 45,
                cuisine: "Italian",
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(201);
    });
    it("should not add this recipe to the database as the name of the recipe is not given", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "",
                description: "hot water used for various purposes",
                steps: ["heat water on gas"],
                ingredients: ["water"],
                miniutesToCook: 45,
                cuisine: "Italian",
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(400);
    });

    it("should not add this recipe to the database as AuthToken is invalid", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: ["heat water on gas"],
                ingredients: ["water"],
                miniutesToCook: 45,
                cuisine: "Italian",
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN + "change",
            });

        expect(response.statusCode).toBe(401);
    });

    it("should cause error due to invalid ingredients and steps type", async () => {
        const response = await supertest(app)
            .post("/api/recipe/addrecipe")
            .send({
                name: "boiled water",
                description: "hot water used for various purposes",
                steps: "heat water on gas",
                ingredients: "water",
                miniutesToCook: 45,
                cuisine: "Italian",
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(400);
    });
});

// END POINT-2 TEST CASE-5
describe("GET /api/recipe/fetchallrecipes", () => {
    it("should get all recipes", async () => {
        const response = await supertest(app)
            .get("/api/recipe/fetchallrecipes")
            .set({
                "Content-Type": "application/json",
            });

        expect(response.status).toBe(200);
        expect(response.body.recipes).toBeDefined();
    });
});

// END POINT-3 TEST CASE-6
describe("GET /api/recipe/fetchuserrecipe", () => {
    it("should get all recipes of the user", async () => {
        const response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });
        expect(response.status).toBe(200);
        expect(response.body.recipes).toBeDefined();
    });
});

// END POINT-4 TEST CASE 7-8
describe("GET /api/recipe/fetchrecipe/:recipeId", () => {
    it("should get fetch a single recipe based on the ID", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes
        let response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        const recipeId = response.body.recipes[0]._id;

        response = await supertest(app)
            .get(`/api/recipe/fetchrecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.recipes).toBeDefined();
    });

    it("should get fetch a single recipe based on the ID", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes but with wrong recipeId
        let response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        const recipeId = response.body.recipes._id;
        response = await supertest(app)
            .get(`/api/recipe/fetchrecipe/${recipeId + "123"}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(400);
    });
});
