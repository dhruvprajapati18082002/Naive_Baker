import recipeContext from "./recipeContext";

import { useState } from "react";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const RecipeContextProvider = (props) => {

    const [ recipes, setRecipes ] = useState([]);
    const [ userRecipes, setUserRecipes ] = useState([]);
    const [ dashboardRecipes, setDashboardRecipes ] = useState([]);

    // add recipe
    const uploadRecipe = async (name, description, cuisine, type, minutesToCook, imageFile, ingredients, steps) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description',description);
        formData.append('cuisine', cuisine);
        formData.append('type', type);
        formData.append('minutesToCook', minutesToCook);
        formData.append('image_url', imageFile);
        formData.append('ingredients', ingredients);
        formData.append('steps', steps);
        
        const response = await axios.post(
            `${BACKEND}/api/recipe/addrecipe`, formData,{
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            }
        ).catch(error => {
            return error.response;
        })
        return response.data;
    }


    const searchRecipe = async (name, time_to_make, ingredients, cuisine, type, satisfyAll) => {
        
        let data = {};
        if (name !== undefined && name.length > 0)
            data.name = name;
        if (time_to_make !== undefined && time_to_make.length > 0)
            data.minutesToCook = time_to_make;
        if (ingredients !== undefined && ingredients.length > 0)
            data.ingredients = ingredients;
        if (cuisine !== undefined && cuisine.length > 0)
            data.cuisine = cuisine;
        if (type !== undefined && type.length > 0)
            data.type = type;
        if (satisfyAll !== undefined)
            data.satisfyAll = satisfyAll;
        
        const response = await axios.post(
            `${BACKEND}/api/query/search`, data,{
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).catch(error => {
            return error.response;
        })
      
        if (response.data.recipes !== undefined){
            setRecipes(response.data.recipes);
            return {total: response.data.total};
        }
        else 
            setRecipes([]);
        return response.data;
    }

        // fetch user recipes
        const fetchUserRecipes = async () => {
            const response = await axios.get(
            `${BACKEND}/api/recipe/fetchuserrecipe`,{
                headers: {
                    'auth-token': localStorage.getItem('token'),
                }
            }
        ).catch(error => {
            return error.response;
        })

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

        const response = await axios.get(URL).catch(error => {return error.response});
        
        if (response.data.recipes !== undefined){
            setDashboardRecipes(response.data.recipes);
            return {total: response.data.total};
        }
        else{
            setDashboardRecipes([]);
            return response.data;
        }
      }

      // edit recipe
      const editRecipe = async (id, name, description, minutesToCook, ingredients, steps, imageFile, cuisine, type) => {
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description',description);
            formData.append('cuisine', cuisine);
            formData.append('type', type);
            formData.append('minutesToCook', minutesToCook);
            formData.append('image_url', imageFile);
            formData.append('ingredients', ingredients);
            formData.append('steps', steps);

            const response = await axios.put(
                `${BACKEND}/api/recipe/updaterecipe/${id}`, formData,{
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                }
            ).catch(error => {
                return error.response.data;
            })
            return response.data;
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
            return error.response;
        })
        return response.data;
      }

    return (
        <recipeContext.Provider value={{ recipes, userRecipes, dashboardRecipes, uploadRecipe, searchRecipe, fetchUserRecipes, fetchRandom, editRecipe, deleteRecipe }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider