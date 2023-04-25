import React from 'react';
import RecipeItem from "../RecipeItem";
import data from "./recipes.json";

const UserRecipes = () => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {
        data.map((entry) => {
            return (
                    <RecipeItem key={entry._id}
                    title = {entry.name}
                    subtitle = {entry.minutesToCook + "min, " + entry.ratings + " Stars"}
                    text = {entry.description}
                    recipeLink = "/search"
                    />
            )
        })
      }
    </div>
  )
}

export default UserRecipes
