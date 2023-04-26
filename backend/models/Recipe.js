const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    minutesToCook: {
        type: Number,
        require: true
    },
    cuisine: {
        type:String,
        require: true
    },
    type: {
        type:String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    steps: {
        type: [String],
        require: true
    },
    ingredients: {
        type: [String], // will be changed to mongoose.Schema.Types.ObjectId
        // ref: "ingredient",
        require: true
    },
    video_url: {
        type: String,
        default: ""
    },
    image_url: {
        type: String,
        default: ""
    },
    ratings: {
        type: Number,
        default: 0
    },
    totalUsersRated: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("recipe", RecipeSchema);