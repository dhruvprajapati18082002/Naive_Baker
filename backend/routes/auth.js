const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'SE@1234';


router.post(
    "/createuser",
    // validation parameters
    body("name", "Name too Short!!").isLength({ min: 5 }),
    body("email", "Email Not Valid!!").isEmail(),
    body("password", "Password too Short!!").isLength({ min: 5 }),

    // async call-back function as parameter
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
        
            // Create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                hasPremium: req.body.hasPremium
            });
            const data = {
                user: {
                id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken })
        
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
)
module.exports = router