const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

connectToMongo();
const app = express();

// port on which the backend API will be running. Either import from environment file or take 5000
const port = process.env.port || 5000;

app.use(express.json()); // enabling capacity to send json objects in response
// enabling cors as middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


app.use("/api/auth", require('./routes/auth'));
app.use("/api/recipe", require('./routes/recipe'));


app.listen(port, ()=>{
    console.log(`NaiveBaker backend listening at http://localhost:${port}`);
})


app.get("/easter_egg", (req, res) =>{ 
    return res.json({
        que: "Why do boomers make horrible cashiers?",
        ans: "They’re afraid of change."
    })
})