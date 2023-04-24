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
            let count=0;
            if (req.body.ingredients !== undefined && req.body.ingredients.length > 0 )
            {
                count=count+1;
                query += "{\"ingredients\" : {\"$all\" : [";
                for (let i=0; i < req.body.ingredients.length - 1; i++)
                {
                    query += `\"${req.body.ingredients[i]}\"`;
                    query += ",";
                }
                query += "\"" + req.body.ingredients[req.body.ingredients.length - 1] + "\" ]}}";
            }

            if (req.body.cuisine !== undefined && req.body.cuisine.length > 0 )
            {
                count=count+1;
                query += "{\"cuisine\" : {\"$all\" : [";
                query += "\"" + req.body.cuisine + "\" ]}}";
            }

            if (req.body.minutesToCook !== undefined )
            {
                count=count+1;
                query += "{\"minutesToCook\" : {\"$lte\" : ";
                query += "\"" + req.body.minutesToCook + "\" }}";
            }
            if (req.body.ratings !== undefined )
            {
                count=count+1;
                query += "{\"ratings\" : {\"$gte\" : ";
                query += "\"" + req.body.ratings + "\" }}";
            }
            query += "]}"
            console.log(query)
            if(count>1){
                return res.status(400).send("Not Allowed to enter more than one filter");
            }
            query = JSON.parse(query);
            console.log(query)
            const recipes = await Recipe.find(query);

            return res.send({total: recipes.length , recipes: recipes});
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
