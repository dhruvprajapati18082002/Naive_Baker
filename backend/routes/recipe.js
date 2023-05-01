const express = require("express");
// const { body, validationResult, check } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Recipe = require('../models/Recipe');
const User = require("../models/User");
const upload = require("../middleware/uploadimage");
const router = express.Router();


// END-POINT 1: ADD RECIPE END-POINT: POST /api/recipe/addrecipe. LOGIN REQUIRED
router.post(
    "/addrecipe",
    fetchuser,
    upload.any(),
    async (req, res) => {
        let errors = [];
        if (req.body.name === undefined || req.body.name.length < 5)
            errors.push("Name must be atleast 5 characters long");
        if (req.body.description === undefined || req.body.description.length < 10)
            errors.push("description must be atleast 10 characters long");
        if (req.body.steps === undefined || req.body.steps.length < 50)
            errors.push("steps must have minimum 50 characters");
        else{
            req.body.steps = req.body.steps.split("\n").filter(element => { return element.length > 0 });
            if (req.body.steps.length < 1)
                errors.push("steps must have minimum 50 characters");
        }
        if (req.body.minutesToCook === undefined || req.body.minutesToCook.match(/^[\d]+$/) === null)
            errors.push("minutesToCook must be a number");
        if (req.body.ingredients === undefined || req.body.ingredients.length < 5)
            errors.push("ingredients must have minimum 5 characters");
        else{
            req.body.ingredients = req.body.ingredients.split("\n").filter(element => { return element.length > 0 });
            if (req.body.ingredients.length < 1)
                errors.push("ingredients must have minimum 5 characters");
        }
        if (req.body.cuisine === undefined)
            errors.push("cuisine must be defined");
        if (req.body.type === undefined)
            errors.push("type must be defined");

        if (errors.length !== 0)
            return res.status(400).json({errors: errors});
        try
        {
            let user = await User.findById(req.user.id)

            if (!user)
                return res.status(401).json({errors: ["Invalid authentication credentials given."]})

            let cred = {
                owner: req.user.id,
                name: req.body.name,
                description: req.body.description,
                steps: req.body.steps,
                ingredients: req.body.ingredients,
                cuisine: req.body.cuisine,
                minutesToCook: req.body.minutesToCook,
                type: req.body.type,
            }
            if (req.files)
                cred.image_url = req.protocol + "://" + req.get('host') + "/public/" + req.files[0].filename;

            let recipe = await Recipe.create(cred);


            const newUser = {recipesOwned: user.recipesOwned.concat(recipe._id)}

            await User.findByIdAndUpdate(req.user.id, {$set: newUser}, {new:true});

            return res.status(201).json({recipes: [recipe]});
        } 
        catch (error) {
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
        }
    }
)


// END-POINT 2: FETCH ALL RECIPES END-POINT: GET /api/recipe/fetchallrecipe/ LOGIN REQUIRED
router.get(
    "/fetchallrecipes",
    async (req, res) => {
        try{
            const recipes = await Recipe.find();
            return res.json({recipes: recipes});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
        }
    }
);


// END-POINT 3: FETCH USER'S ALL RECIPES: GET /api/recipe/fetchuserrecipe. LOGIN REQUIRED
router.get(
    "/fetchuserrecipe",
    fetchuser,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user)
            return res.status(401).send({errors: ["Not Authorized to Perform the Action!"]});

            const userRecipes = await Recipe.find({ owner:req.user.id }); 
            res.status(200).json({recipes: userRecipes});
            
          } catch (error) {
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
          }
    }
)


// END-POINT 4: FETCH RECIPE END-POINT: GET /api/recipe/fetchrecipe/:recipeId. LOGIN REQUIRED
router.get(
    "/fetchrecipe/:recipeId",
    fetchuser,
    async (req, res) => {
        try
        {
            let user = await User.findById(req.user.id);

            if(!user)
                return res.status(401).json({errors: ["Invalid authentication credentials given."]})

            let recipe = await Recipe.findById(req.params.recipeId);
            if (!recipe)
                return res.status(400).json({ errors: ["No Recipe with that ID found."] });
            
            const isOwned = recipe.owner == user.id;
            user = await User.findById(recipe.owner);
            return res.send({isOwned: isOwned, recipes: [recipe], owner: user.username});
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
        }
    }
)


// END-POINT 5: UPDATE RECIPE END-POINT: POST /api/recipe/updaterecipe. LOGIN REQUIRED
router.put(
    "/updaterecipe/:recipeId",
    upload.any(),
    fetchuser,
    async (req, res) => {
        const { name, description, steps,ingredients, minutesToCook, cuisine, type} = req.body;
        try {
            const newRecipe = {};

            if (name) { newRecipe.name = name; }
            if (description) { newRecipe.description = description; }
            if (steps) { newRecipe.steps = steps.split("\n").filter(element => {return element.length > 0}); }
            if (ingredients) { newRecipe.ingredients = ingredients.split("\n").filter(element => {return element.length > 0}); }
            if (minutesToCook) { newRecipe.minutesToCook = minutesToCook; }
            if (cuisine) { newRecipe.cuisine = cuisine; }
            if (type) { newRecipe.type = type; }
            
            if (req.files.length > 0) { newRecipe.image_url = req.protocol + "://" + req.get('host') + "/public/" + req.files[0].filename; }

            let recipe = await Recipe.findById(req.params.recipeId);
            if (!recipe) { 
                return res.status(400).json({errors: ["Invalid Recipe Id!"]}) 
            }
    
            if (recipe.owner.toString() !== req.user.id) {
                return res.status(401).send({errors: ["Not Authorized to Perform the Action!"]});
            }
            recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, { $set: newRecipe }, { new: true })
            res.json({ recipes: [recipe] });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
        }
    }
)


// END-POINT 6: DELETE RECIPE END-POINT: DELETE /api/recipe/deleterecipe/:recipeId. LOGIN REQUIRED
router.delete(
    "/deleterecipe/:recipeId",
    fetchuser,
    async (req, res) => {
        try {
            let recipe = await Recipe.findById(req.params.recipeId);
            
            if (!recipe) {
                return res.status(400).json({errors: ["Invalid Recipe Id!"]}) 
            }
    
            if (recipe.owner.toString() !== req.user.id) 
                return res.status(401).send({errors: ["Not Authorized to Perform the Action!"]});
            
            
            recipe = await Recipe.findByIdAndDelete(req.params.recipeId)
            
            // updating the list of recipes with user   
            const user = await User.findById(recipe.owner);
            let newUser = {}
            newUser.recipesOwned = user.recipesOwned.filter(recipeId => { return recipeId != req.params.recipeId; })
            
            await User.findByIdAndUpdate(user.id, {$set: newUser}, {$new: true});

            res.json({recipes: [recipe]});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({errors: ["Internal Server Error!"]});
        }
    }
)

module.exports = router;