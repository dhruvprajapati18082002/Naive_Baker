const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();

const app = require("../app");
const User = require("../models/User");

let EMAIL = "testuser02@example.com";
let PASSWORD = "testpassword";
let AUTH_TOKEN = null;
const INVALID_DATA_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0M2FjOWY1NWVlNjYxODZlYTY1ODBiIn0sImlhdCI6MTY4MjE1NjcwM30.gB3zacXMVQnmZC_hSTh2-LcmAsjWOySyjHt4OAr78OU";
const INVALID_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDAwMCJ9LCJpYXQiOjE2ODIxNTYzNTB9.BTIM0S7_IvbrVB7NhPKbqJd7u2sr4txREL_lkbzl8YU";


// Connecting to the database before each test.
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({email: EMAIL});

    if (!user){
        const token = await supertest(app).post("/api/auth/createuser").send({
            name: "Test User",
            username: "TestUser@02",
            email: EMAIL,
            password: PASSWORD,
        });
        
        AUTH_TOKEN = await token.body.authToken;
    }
    else{
        // in-case previous test failed and the user was not removed
        const token = await supertest(app).post("/api/auth/login").send({
            email: EMAIL,
            password: PASSWORD
        })
        AUTH_TOKEN = await token.body.authToken;
    }
    await User.findOneAndUpdate({email: EMAIL}, { $set: { hasPremium: true }});
});

// Closing database connection after each test.
afterAll(async () => {
    await supertest(app).delete("/api/auth/delete").set({
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
    });

    await mongoose.connection.close();
});

// END-POINT 1: TEST CASES 1-5
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
                type: "veg"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.status).toBe(201);
        expect(response.body.recipes).toBeDefined();
    });
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
                type: "veg"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.status).toBe(201);
        expect(response.body.recipes).toBeDefined;
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
                type: "veg"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
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
                type: "veg"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN + "change",
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
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
                type: "veg"
            })
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});


// END POINT-2 TEST CASE-6
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

// END POINT-3 TEST CASE 7-9
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
    it("should fail due to invalid auth-token", async () => {
        const response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": INVALID_TOKEN
            });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
    it("should fail due to invalid auth-token data", async () => {
        const response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": INVALID_DATA_TOKEN
            });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })
});

// END POINT-4 TEST CASE 10-11
describe("GET /api/recipe/fetchrecipe/:recipeId", () => {
    it("should fetch a single recipe based on the ID", async () => {
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

    it("should not return error due to invalid recipe ID", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes but with wrong recipeId

        const recipeId = "321234567890098765432123";
        const response = await supertest(app)
            .get(`/api/recipe/fetchrecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

// END POINT-6 TEST CASE 12-13
describe("DELETE /api/recipe/deleterecipe/:recipeId", () => {
    it("should  delete a single recipe based on the ID", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes
        let response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        const recipeId = response.body.recipes[0]._id;

        response = await supertest(app)
            .delete(`/api/recipe/deleterecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.recipes).toBeDefined();
    });
    it("should return error due to invalid Authentication token", async () => {
        // get all recipes, take the first recipe's ID and then use it to fetch all other recipes
        let response = await supertest(app)
            .get("/api/recipe/fetchuserrecipe")
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN,
            });

        const recipeId = response.body.recipes[0]._id;

        response = await supertest(app)
            .delete(`/api/recipe/deleterecipe/${recipeId}`)
            .set({
                "Content-Type": "application/json",
                "auth-token": AUTH_TOKEN+'123',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.errors).toBeDefined();
    });    
});
