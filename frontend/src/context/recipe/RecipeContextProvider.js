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

    const searchRecipe = async (veg_name, time_to_make, ingredients, cuisine, rating) => {
        
        let data = {};
        if (veg_name !== undefined)
          data.name = veg_name;
        else if (time_to_make !== undefined)
          data.minutesToCook = time_to_make;
        else if (ingredients !== undefined)
          data.ingredients = ingredients;
        else if (cuisine !== undefined)
          data.cuisine = cuisine;
        else if (rating !== undefined)
          data.ratings = rating;
        
        const response = await axios.post(
            `http://localhost:5000/api/query/search`, data,{
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).catch(error => {
            return error.message
        })

        if (response.status === 200){
            setRecipes(response.data.recipes)
            console.log(response.data.recipes)
        }
        console.log(recipes)
      }

    return (
        <recipeContext.Provider value={{ recipes, uploadRecipe, searchRecipe  }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider