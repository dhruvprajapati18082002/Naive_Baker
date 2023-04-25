import recipeContext from "./recipeContext";
import { useState } from "react";

const RecipeContextProvider = (props) => {

    const [ recipes, setRecipes ] = useState({});

    return (
        <recipeContext.Provider value={{ recipes }}>
            {props.children}
        </recipeContext.Provider>
    );
};

export default RecipeContextProvider