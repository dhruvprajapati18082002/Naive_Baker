import axios from "axios";

import recipeContext from "./recipeContext";
import { useState } from "react";

const BACKEND = "http://localhost:5000"

const RecipeContextProvider = (props) => {

    const [ recipeDisplayed, setRecipeDisplayed ] = useState({});

    const getRecipe = async (recipeId) => {
        const response = await axios.get(
            `${BACKEND}/api/recipe/fetchrecipe/${recipeId}`,
            {
                headers: {
                    "auth-token" : localStorage.getItem("token"),
                }
            }
        )

        if (response.status === 200){
            setRecipeDisplayed(response.data.recipes)
            return true;
        }
        return false;
    }
    return (
        <recipeContext.Provider value={{ recipeDisplayed, getRecipe }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider