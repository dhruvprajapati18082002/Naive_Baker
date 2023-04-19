const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo DB");
}

module.exports = connectToMongo;