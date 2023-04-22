const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

require("dotenv").config();

const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const Recipe = require("../models/Recipe");

const JWT_SECRET = process.env.JWT_SECRET;


// END-POINT 1: CREATE USER END-POINT: POST /api/auth/createuser. NO LOGIN NEEDED
router.post(
    "/createuser",
    // validation parameters
    body("name", "Name too Short!!").isLength({ min: 5 }),
    body("username", "UserName too Short!!").isLength({ min: 5 }),
    body("email", "Email Not Valid!!").isEmail(),
    body("password", "Password too Short!!").isLength({ min: 5 }),
    body("hasPremium", "Must specify Account Type").exists(),

    // async call-back function as parameter
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errors: ["Sorry a user with this email already exists"] })
            }

            user = await User.findOne({ username: req.body.username });
            if (user) {
                return res.status(400).json({ errors: ["Sorry a user with this username already exists"] })
            }

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
        
            // Create a new user
            user = await User.create({
                name: req.body.name,
                username: req.body.username,
                password: securePassword,
                email: req.body.email,
                hasPremium: req.body.hasPremium
            });
            const data = {
                user: {
                id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            // status code 201 indicates successfull creation of a resource
            return res.status(201).json({ authToken: authToken })
        
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT 2: LOGIN USER END-POINT: POST /api/auth/login. NO LOGIN NEEDED
router.post(
    '/login',
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password cannot be blank").exists(),

    async (req, res) => {
        // return 'Bad Request' and the errors if found any
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const {email, password} = req.body;

        try{
            let user = await User.findOne({email});
            if (!user)
                return res.status(400).json({errors: ["Please provide valid credentials."]});
            
            // compare the password from URL with the user's password hash fetched from the database
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare)
                return res.status(400).json({errors: ["Please provide valid credentials."]});

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.json({authToken: authToken});
        }
        catch( error ) {
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT 3: GET USER END-POINT: POST /api/auth/getprofile. LOGIN NEEDED
router.post(
    '/getProfile',
    fetchuser,
    async (req, res) => {
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");

            if (user)
                return res.send(user);
            else
                return res.status(400).send({errors: ["Auth-Token Contains Non-existent User"]})
        }
        catch (error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT 4: GET OTHER USER'S DETAILS END-POINT: POST /api/auth/getuser/:username. LOGIN NOT REQUIRED
router.post(
    '/getuser/:username',
    async (req, res) => {
        try{
            const user = await User.findOne({username: req.params.username}).select("name username email recipesOwned");
            return res.send(user);
        }
        catch (error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
);


// END-POINT 5:  UPDATE USER DETAILS END-POINT: PUT /api/auth/updateuser. LOGIN NEEDED
router.put(
    "/updateuser",
    fetchuser,
    async (req, res) => {
        try{
            const {name, email} = req.body;
            
            const newUser = {};
            if (name)
                newUser.name = name;
            if (email)
                newUser.email = email;

            let user = User.findById(req.user.id);
            if (!user)
                return res.status(401).send("Operation Not Allowed");

            user = await User.findByIdAndUpdate(req.user.id, {$set: newUser}, {new: true});
            return res.json(user);
        }
        catch (error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


// END-POINT 6: UPDATE USER PASSWORD END-POINT: PUT /api/auth/changepassword. LOGIN NEEDED
router.put(
    "/changepassword",
    fetchuser,
    async (req, res) => {
        try{
            const {oldPassword, newPassword} = req.body;
            
            let user = User.findById(req.user.id);
            if (!user)
                return res.status(401).send("Operation Not Allowed");

            const newUser = {};
            if (!bcrypt.compare(oldPassword, user.password))
                return res.status(401).send("Invalid Password");
            
            newUser.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

            user = await User.findByIdAndUpdate(req.user.id, {$set: newUser}, {new: true}).select("-password");
            return res.json(user);
        }
        catch (error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
    }
)


// END-POINT 7: DELETE USER END-POINT: DELETE /api/auth/delete. LOGIN NEEDED
router.delete(
    '/delete',
    fetchuser,
    async (req, res) => {
        try{
            const userId = req.user.id;
            
            const data = await User.findByIdAndDelete(userId);
            
            if (!data)
                return res.status(401).send({errors: ["Unauthorized - invalid authentication credentials given."]});
            
            // deleting all the recipes owned by that user
            data.recipesOwned.forEach( async (recipeId) => {
                await Recipe.findByIdAndDelete(recipeId);
            })

            return res.sendStatus(204);
        }
        catch(error){
            console.log(error.message);
            return res.status(500).send("Internal Server Error!");
        }
});


module.exports = router;