const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Recipe = require('../models/Recipe');
const User = require("../models/User");
const router = express.Router();


// END-POINT 1: ADD RECIPE END-POINT: POST /api/recipe/addrecipe. LOGIN REQUIRED
router.post(
    "/addrecipe",
    body('name').isLength({min: 5}),
    body('description').isLength({min: 10}),
    body('steps').isArray({min: 1}),
    body('minutesToCook').isNumeric({min :1}),
    body('cuisine').isLength({min:2}),
    body('ingredients').isArray({min: 1}),
    body('type').exists(),
    fetchuser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
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
            
            if (req.body.image_url)
                cred.image_url = req.body.image_url;

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
    fetchuser,
    async (req, res) => {
        const { name, description, steps,ingredients, minutesToCook, cuisine, image_url, type} = req.body;
        try {
            const newRecipe = {};
            if (name) { newRecipe.name = name; }
            if (description) { newRecipe.description = description; }
            if (steps) { newRecipe.steps = steps; }
            if (ingredients) { newRecipe.ingredients = ingredients; }
            if (minutesToCook) { newRecipe.minutesToCook = minutesToCook; }
            if (cuisine) { newRecipe.cuisine = cuisine; }
            if (image_url) { newRecipe.image_url = image_url; }
            if (type) { newRecipe.type = type; }
            

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