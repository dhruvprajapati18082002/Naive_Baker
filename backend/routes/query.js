const express = require("express");
const fetchuser = require("../middleware/fetchuser");
// const { query, validationResult } = require("express-validator");

const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient")

const router = express.Router();

router.get(
    "/", 
    async (req, res) => {
        const data = {
            params: req.params,
            body: req.body,
            query: req.query,
            headers: req.headers,
        };
        return res.send({ data });
    }
);

router.post(
    "/search",
    async (req, res) => {
        try{
            let query = "{\"$or\": [";

            if (req.body.ingredients !== undefined && req.body.ingredients.length > 0 )
            {
                query += "{\"ingredients\" : {\"$all\" : [";
                for (let i=0; i < req.body.ingredients.length - 1; i++)
                {
                    query += `\"${req.body.ingredients[i]}\"`;
                    query += ",";
                }
                query += "\"" + req.body.ingredients[req.body.ingredients.length - 1] + "\" ]}}";
            }


            query += "]}"

            console.log(query)
            query = JSON.parse(query);
            console.log(query)
            const recipes = await Recipe.find(query);

            return res.send({recipes: recipes});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


router.post(
    "/allchefs",
    async (req, res) => {
        try{
            const chefs = await User.find().select("username");
            return res.json(chefs)
        }
        catch (error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


router.get(
    "/allingredients",
    fetchuser,
    async (req, res) => {
        const ingredients = await Ingredient.find();
        res.send(ingredients);
    }
)

module.exports = router;
