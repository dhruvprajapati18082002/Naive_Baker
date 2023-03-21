const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
    "/create-user",

    // validation parameters
    body("name", "Name too Short!!").isLength({ min: 5 }),
    body("email", "Email Not Valid!!").isEmail(),
    body("password", "Password too Short!!").isLength({ min: 5 }),

    // async call-back function as parameter
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        return res.json({user: req.body, message: "received following user!!"});
    } 
)

module.exports = router