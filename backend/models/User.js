const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
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
    recipesOwned: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "recipe"
    },
    recipesRated: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "recipe"
    }
});

module.exports = mongoose.model("user", UserSchema);
