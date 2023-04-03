const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    owner: {
        type:mongoose.schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    video_url: {
        type: String,
    },
    ratings: {
        type: Number
    },
    totalUsersRated: {
        type: Number
    }
});

module.exports = mongoose.model("recipe", RecipeSchema);