const express = require("express");
const router = express.Router();

const Ingredient = require("../models/Ingredient");


router.post(
    "/add",
    async (req, res) => {
        const entry = await Ingredient.create({ingredient: req.body.ingredient});
        return res.send({entry});
    } 
);


module.exports = router;