const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const { Query } = require("mongoose");

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
    body("satisfyAll").default(true).isBoolean(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        
        try{
            let constraints = []
            
            if (req.body.name !== undefined)
                constraints.push({name: {$regex: req.body.name, $options: 'i'}});
            
            if (req.body.cuisine !== undefined)
                constraints.push({cuisine: {$regex: req.body.cuisine, $options: 'i'}});
            
            if (req.body.type !== undefined)
                constraints.push({type: {$regex: `^${req.body.type}`, $options: 'i'}});

            if (req.body.minutesToCook !== undefined)
                constraints.push({minutesToCook: {$lte: req.body.minutesToCook}});
    
            if (req.body.ratings !== undefined)
                constraints.push({ratings: {$gte: req.body.ratings}});
            
            if (req.body.ingredients !== undefined && req.body.ingredients.length > 0){
                // converting each ingredient to /.*<name>.*/i regex where i denotes case-insensitivity
                const ingredients = req.body.ingredients.map( ingred => { return RegExp(ingred, ["i"]) } );  
                constraints.push({ingredients: {$all: ingredients}});
            }

            let recipes = null;
            let query = {}
            
            
            if (req.body.satisfyAll)
                query.$and = constraints;
            else 
                query.$or = constraints;

            if (constraints.length === 0)
                recipes = await Recipe.find();
            else //if (constraints.length === 1)
                recipes = await Recipe.find(query);
            // else
            //     return res.status(400).json({errors: ["Cannot Send More than one query Parameter"]});
            
            return res.json({total: recipes.length, recipes: recipes});
        }
        catch(error) {
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
