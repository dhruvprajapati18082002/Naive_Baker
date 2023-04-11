const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000; // port on which the backend API will be running

app.use(express.json()); // enabling capacity to send json objects in response
// enabling cors as middleware
app.use(cors({
    origin: "http://localhost:3000",
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