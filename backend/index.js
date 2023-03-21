const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 5000; // port on which the backend API will be running

app.use(express.json()) // enabling capacity to send json objects in response

// app.use('<url-path>', require('<file-path>'))

app.use("/auth", require('./routes/auth'))

app.listen(port, ()=>{
    console.log(`NaiveBaker backend listening at http://localhost:${port}`);
})

app.get("/", (rep, res)=>{
    return res.json("NaiveBaker Backend Reached!!");
})