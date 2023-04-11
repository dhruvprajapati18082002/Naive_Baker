const mongoose = require("mongoose");


const IngredientModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model("ingredient", IngredientModel);