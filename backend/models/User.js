const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    hasPremium: {
        type: Boolean,
        default: false
    },
    watchHistory: {
        type: [String]
    },
    UserFollowing: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user"
    },
    recipesRated: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "recipe"
    }
});

module.exports = mongoose.model("user", UserSchema);
