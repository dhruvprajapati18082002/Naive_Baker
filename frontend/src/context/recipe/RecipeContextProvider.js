import recipeContext from "./recipeContext";

import { useState } from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const RecipeContextProvider = (props) => {

    const [ recipes, setRecipes ] = useState([]);
    const [ userRecipes, setUserRecipes ] = useState([]);

    // add recipe
    const uploadRecipe = async (name, description, cuisine, duration, ingredients, steps, type) => {
        const response = await axios.post(
            `${BACKEND}/api/recipe/addrecipe`,{
                name: name,
                description: description,
                cuisine: cuisine,
                minutesToCook: duration,
                ingredients: ingredients,
                steps: steps,
                type: type
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

    // Search Recipe 
    const searchRecipe = async (veg_name, time_to_make, ingredients, cuisine, rating, type) => {
        
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
        else if (type !== undefined)
            data.type = type;
        
        const response = await axios.post(
            `${BACKEND}/api/query/search`, data,{
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).catch(error => {
            return error.message
        })

        if (response.status === 200){
            setRecipes(response.data.recipes);
        }
        else 
            setRecipes([]);
      }

      // fetch user recipes
      const fetchUserRecipes = async () => {
        const response = await axios.get(
            `${BACKEND}/api/recipe/fetchuserrecipe`,{
                headers: {
                    'auth-token': localStorage.getItem('token'),
                }
            }
        );
        if (response.status === 200)
            setUserRecipes(response.data.recipes);
        else
            setUserRecipes([]);
      }

    return (
        <recipeContext.Provider value={{ recipes, userRecipes, uploadRecipe, searchRecipe, fetchUserRecipes }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider