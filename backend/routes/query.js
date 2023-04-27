const express = require("express");

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
            let count = 0;

            if (req.body.name !== undefined )
            {
                count++
                query += "{\"name\" : {\"$regex\" : \".*";
                query += req.body.name + ".*\" }}";
            }
            if (req.body.ingredients !== undefined && req.body.ingredients.length > 0 )
            {
                count++;
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
                count++
                query += "{\"cuisine\" : {\"$all\" : [";
                query += "\"" + req.body.cuisine + "\" ]}}";
            }

            if (req.body.minutesToCook !== undefined )
            {
                count++
                query += "{\"minutesToCook\" : {\"$lte\" : ";
                query += "\"" + req.body.minutesToCook + "\" }}";
            }
            if (req.body.ratings !== undefined )
            {
                count++
                query += "{\"ratings\" : {\"$gte\" : ";
                query += "\"" + req.body.ratings + "\" }}";
            }
            if(req.body.type!== undefined){
                count++;
                console.log('in type query')
                query += "{\"type\" : {\"$all\" : [";
                query += "\"" + req.body.type + "\" ]}}";
            }
            query += "]}"
            
            if(count>1)
                return res.status(400).send("Not Allowed to enter more than one filter");
            
            query = JSON.parse(query);
            
            const recipes = await Recipe.find(query);

            return res.json({total: recipes.length , recipes: recipes});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT to fetch "size" number of random recipes. Default value for size is 15.
// "size" is passed as query parameter
router.get(
    "/randomrecipes",
    async(req, res) => {
        try{
            let count = 15;
            if (req.query.size !== undefined)
                count = req.query.size;
            
            let query = `[{ \"$sample\": { \"size\": ${count} } }]`;
            
            query = JSON.parse(query)
            
            const recipes = await Recipe.aggregate(query);
            
            return res.json({total: recipes.length, recipes: recipes});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


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
    async (req, res) => {
        try{
            const ingredients = await Ingredient.find();
            res.json({ingredients: ingredients});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)

module.exports = router;
