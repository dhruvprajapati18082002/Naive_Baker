import React, { useContext, useEffect } from 'react';
import RecipeItem from "../RecipeItem";
import recipeContext from '../../context/recipe/recipeContext';

const UserRecipes = () => {
  	const { userRecipes, fetchUserRecipes } = useContext(recipeContext);

	useEffect(()=>{
		fetchUserRecipes();
	},[]);

  	return (
    	<div className="d-flex flex-wrap justify-content-around">
			{
				userRecipes !== undefined && userRecipes.length > 0 ? userRecipes.map((entry) => {
					return (
						<RecipeItem key={entry._id}
							title = {entry.name}
							subtitle = {entry.minutesToCook + "min, " + entry.ratings + " Stars"}
							text = {entry.description}
							recipeLink = "/search"
						/>
					)
				}) :
				"No Recipes Uploaded by You Yet."
			}
    	</div>
  	)
}

export default UserRecipes
