import recipeContext from "./recipeContext";

import { useState } from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const RecipeContextProvider = (props) => {

    const [ recipes, setRecipes ] = useState([]);
    const [ userRecipes, setUserRecipes ] = useState([]);
    const [ dashboardRecipes, setDashboardRecipes ] = useState([]);

    // add recipe
    const uploadRecipe = async (name, description, cuisine, type, minutesToCook, image_url, ingredients, steps) => {
        const response = await axios.post(
            `${BACKEND}/api/recipe/addrecipe`,{
                name: name,
                description: description,
                cuisine: cuisine,
                minutesToCook: minutesToCook,
                ingredients: ingredients,
                steps: steps,
                type: type,
                image_url: image_url
            },{
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            }
        ).catch(error => {
            console.log(error)
            return error.message;
        })
        console.log(response)
        return response.data;
    }

    // Search Recipe 
    const searchRecipe = async (veg_name, time_to_make, ingredients, cuisine, type) => {
        
        let data = {};
        if (veg_name !== undefined)
            data.name = veg_name;
        else if (time_to_make !== undefined)
            data.minutesToCook = time_to_make;
        else if (ingredients !== undefined)
            data.ingredients = ingredients;
        else if (cuisine !== undefined)
            data.cuisine = cuisine;
        else if (type !== undefined)
            data.type = type;
        
        console.log(data)
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

      // fetch random recipes
      const fetchRandom = async (count) => {
        
        let URL = `${BACKEND}/api/query/randomrecipes`
        if (count !== undefined)
            URL += `/?size=${count}`;

        const response = await axios.get(URL);
        
        if (response.status === 200)
            setDashboardRecipes(response.data.recipes);
        else
            setDashboardRecipes([]);
      }

      // edit recipe
      const editRecipe = async (id, name, description, minutesToCook, ingredients, steps, image_url) => {
            const response = await axios.put(
                `${BACKEND}/api/recipe/updaterecipe/${id}`, {
                    name: name, 
                    description: description,
                    minutesToCook: minutesToCook,
                    ingredients: ingredients,
                    steps: steps,
                    image_url: image_url
                },{
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                }
            ).catch(error => {
                return error.response;
            })
            return {status: response.status, data: response.data};
      }

      // delete Recipe
      const deleteRecipe = async (id) => {
        const response = await axios.delete(
            `${BACKEND}/api/recipe/deleterecipe/${id}`,{
                headers:{
                    "auth-token": localStorage.getItem('token')
                }
            }
        ).catch(error => {
            return error.data;
        })
        if (response.status === 200)    
            return response.data;
        return response;
      }

    return (
        <recipeContext.Provider value={{ recipes, userRecipes, dashboardRecipes, uploadRecipe, searchRecipe, fetchUserRecipes, fetchRandom, editRecipe, deleteRecipe }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider