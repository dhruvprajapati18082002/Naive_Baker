const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Recipe = require('../models/Recipe');
const router = express.Router();


// END-POINT 1: ADD RECIPE END-POINT: POST /api/recipe/addrecipe. LOGIN REQUIRED
router.post(
    "/addrecipe",
    body('name').isLength({min: 5}),
    body('description').isLength({min: 10}),
    body('steps').isArray({min: 1}),
    body('ingredients').isArray({min: 1}),
    fetchuser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        try
        {
            let cred = {
                owner: req.user.id,
                name: req.body.name,
                description: req.body.description,
                steps: req.body.steps,
                ingredients: req.body.ingredients
            }
            
            if (req.body.video_url)
                cred[video_url] = req.body.video_url;

            let recipe = await Recipe.create(cred);
            return res.status(201).json(recipe);
        } 
        catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


// END-POINT 2: FETCH ALL RECIPES END-POINT: POST /api/recipe/fetchallrecipe/ LOGIN REQUIRED
router.post(
    "/fetchallrecipes",
    fetchuser,
    async (req, res) => {
        try{
            const recipes = await Recipe.find({owner: req.user.id});
            return res.json(recipes);
        }
        catch(error){
            console.error(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT 3: FETCH RECIPE END-POINT: POST /api/recipe/fetchrecipe/:recipeId. LOGIN REQUIRED
router.post(
    "/fetchrecipe/:recipeId",
    fetchuser,
    async (req, res) => {
        try
        {
            const recipe = await Recipe.findById(req.params.recipeId);
            if (!recipe)
                return res.status(400).json({ error: "No Recipe with that ID found." });
            
            if (recipe.owner != req.user.id)
            {
                recipe = {
                    "name": recipe.name,
                    "description": recipe.description,
                    "video_url": recipe.video_url,
                    "steps": recipe.steps,
                    "ingredients": recipe.ingredients
                }
            }
            
            return res.send(recipe);
        }
        catch(error){
            console.error(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


// END-POINT 4: UPDATE RECIPE END-POINT: POST /api/recipe/updaterecipe. LOGIN REQUIRED
// router.post(
//     "/",
//     fetchuser,
//     async (req, res) => {
        
//     }
// )


// END-POINT 5: DELETE RECIPE END-POINT: DELETE /api/recipe/deleterecipe/:recipeId. LOGIN REQUIRED
// router.post(
//     "/",
//     fetchuser,
//     async (req, res) => {
        
//     }
// )


module.exports = router;