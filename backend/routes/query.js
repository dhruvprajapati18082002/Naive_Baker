require("dotenv").config();
const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Recipe = require('../models/Recipe');
const router = express.Router();


router.post("/search", async (req, res) => {
    try {
        let sz = 0;
        if (req.body.ingredients !== undefined && req.body.ingredients.length !== 0) sz++;
        if (req.body.owner !== undefined && req.body.owner.length !== 0) sz++;
        if (req.body.name !== undefined && req.body.name.length !== 0) sz++;
        if (sz === 0) {
            const recipes = await Recipe.find();
            const response = {
                ok: true,
                data: {
                    status: 200,
                    msg: "search successfull",
                    recipes: recipes,

                },
                err: {
                }
            }
            res.send(response);
        }
        else {
            let query = "";
            query += "{\"$and\" : ["
            if (req.body.ingredients !== undefined && req.body.ingredients.length !== 0) {
                console.log(req.body.ingredients);
                sz--;
                query += "{\"ingredients.ingname\"";
                query += " : {\"$all\" : ["
                for (let i = 0; i < req.body.ingredients.length - 1; i++) {
                    query += "\"";
                    query += req.body.ingredients[i];
                    query += "\"";
                    query += ",";
                }
                query += "\"";
                query += req.body.ingredients[req.body.ingredients.length - 1];
                query += "\"";
                query += "]}}";
                if (sz !== 0) {
                    query += ",";
                }
            }
            if (req.body.owner !== undefined && req.body.owner.length !== 0) {
                sz--;
                query += "{\"owner\"";
                query += " : {\"$in\" : ["
                for (let i = 0; i < req.body.chefnames.length - 1; i++) {
                    query += "\"";
                    query += req.body.chefnames[i];
                    query += "\"";
                    query += ",";
                }
                query += "\"";
                query += req.body.chefnames[req.body.chefnames.length - 1];
                query += "\"";
                query += "]}}";
                if (sz !== 0) {
                    query += ",";
                }
            }
            query += "]}"
            let sample = JSON.parse(query);
            const recipes = await Recipe.find(sample);
            const response = {
                ok: true,
                data: {
                    status: 200,
                    msg: "search successfull",
                    recipes: recipes,
                },
                err: {
                }
            }
            res.send(response);
        }

    } catch (err) {
        console.log(err);
        const response = {
            ok: false,
            data: {
            },
            err: {
                status: 400,
                msg: err.message
            }
        }
        res.send(response);
    }
});

module.exports = router;