import recipeContext from "./recipeContext";

import { useState } from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND;

const RecipeContextProvider = (props) => {

    const [ recipes, setRecipes ] = useState([]);

    // add recipe
    const uploadRecipe = async (name, description, cuisine, duration, ingredients, steps) => {
        const response = await axios.post(
            `${BACKEND}/api/recipe/addrecipe`,{
                name: name,
                description: description,
                cuisine: cuisine,
                minutesToCook: duration,
                ingredients: ingredients,
                steps: steps
            },{
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            }
        ).catch(error => {
            return error.message
        })
        return response.data;
    }

    return (
        <recipeContext.Provider value={{ recipes, uploadRecipe }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider