const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// using express.json() middleware to parse request having header application/json.
app.use(express.json());

// enabling cors as middleware to allow requests from frontend only
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use("/api/auth", require('./routes/auth'));
app.use("/api/recipe", require('./routes/recipe'));


module.exports = app;