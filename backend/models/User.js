const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    hasPremium: {
        type: Boolean,
        required: true
    },
    watchHistory: {
        type: [String]
    },
    recipesOwned: {
        type: [String]
    },
    recipesRated: {
        type: [String]
    }
});

module.exports = mongoose.model("user", UserSchema);