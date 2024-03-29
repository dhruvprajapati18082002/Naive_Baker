import React, { useContext, useEffect } from "react";
import RecipeItem from "./RecipeItem";

import "./font.css";
import "./Home.css";
import "./fonts/GreatVibes-Regular.ttf";
import "./fonts/AutumnFlowers-9YVZK.otf";
import "./fonts/WeddingdayPersonalUseRegular-1Gvo0.ttf";
import "./fonts/AngelicaPersonalUseItalic-MVmZB.ttf";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";

import recipeContext from "../context/recipe/recipeContext";
import alertContext from "../context/alert/alertContext";
import spinnerContext from "../context/spinner/spinnerContext";

const Home = () => {

	const { showAlert } = useContext(alertContext);
	const { setLoading } = useContext(spinnerContext);
	const { dashboardRecipes, fetchRandom } = useContext(recipeContext);

	useEffect(()=>{
		setLoading(true);
		// fetchRandom(); // fetches 15 recipes by default
		const response = fetchRandom(10);

		if (response.errors !== undefined)
			showAlert(response.errors.join("\n"), "danger");
		setLoading(false);
	}, []);

 	return (
    	<div className="container-fluid" style={{ backgroundColor: "#8fc4b7" }}>
      		<div
        		className="BackgroundImage row bg-image d-flex justify-content-left align-items-center"
        		style={{
	          		background:
            			"url(https://thumbs.dreamstime.com/b/baking-cooking-wood-background-various-ingredients-utensils-warm-61441357.jpg) no-repeat center center/cover"
        		}}
			>
				<center style={{width: "fit-content"}}>
					<p className="WelcomeText" style={{fontFamily: "BunchBlossomsPersonalUse-0nA4"}}>
						WELCOME <br />
						TO <br />
						NAIVE BAKER
					</p>
				</center>
			<div></div>
			<div></div>
			</div>

			<div>
				<br />
				<center><p className="h1">Recipes of the Day</p></center> 

				<div className="d-flex flex-wrap justify-content-around">
					{
						dashboardRecipes !== undefined && dashboardRecipes.length > 0 ?
						dashboardRecipes.map((recipe) => {
							return (
								<RecipeItem key={recipe._id}
              						image = {recipe.image_url}
									title = {recipe.name}
              						typearea = {recipe.type}
									cuisinearea = {recipe.cuisine}
              						duration = {recipe.minutesToCook}
									text = {recipe.description}
									recipeLink = {`/recipe/${recipe._id}`}
								/>
							)
						})
						:
						"No Recipes Found From the Database !"
					}
				</div>
			</div>
		</div>
  	);
};

export default Home;
