const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use('/public', express.static("public"))

// using express.json() middleware to parse request having header application/json.
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// enabling cors as middleware to allow requests from frontend only
app.use(cors({
    origin: process.env.FRONTEND_URL.replace(/"/g, ""),
    credentials: true
}));

app.use("/api/auth", require('./routes/auth'));
app.use("/api/recipe", require('./routes/recipe'));
app.use("/api/query", require('./routes/query'));


module.exports = app;