import React, { useContext, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import "./font.css";
import "./fonts/GreatVibes-Regular.ttf";
import "./fonts/AutumnFlowers-9YVZK.otf";
// import "./fonts/SweetHipster-PzlE.tff";
import "./fonts/WeddingdayPersonalUseRegular-1Gvo0.ttf";
import "./fonts/AngelicaPersonalUseItalic-MVmZB.ttf";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";
import recipeContext from "../context/recipe/recipeContext";


const Home = (props) => {

	const { dashboardRecipes, fetchRandom } = useContext(recipeContext);

	useEffect(()=>{
		// fetchRandom(10);
		fetchRandom(10);
	}, []);

 	return (
    	<div className="container-fluid" style={{ backgroundColor: "#8fc4b7" }}>
      		<div
        		className="row bg-image"
        		style={{
	          		backgroundImage:
            			"url(https://thumbs.dreamstime.com/b/baking-cooking-wood-background-various-ingredients-utensils-warm-61441357.jpg)",          
          			height: "100vh"
        		}}
			>
				<div style={{ width: "50em" }}>
					<center>
						<p style={{ fontSize: 86, color: "white", fontWeight: "bold", fontFamily: "BunchBlossomsPersonalUse-0nA4"}}>
							{" "}
							{" "}	
							<br />
							WELCOME <br />
							TO <br />
							NAIVE BAKER{" "}
						</p>
					</center>
				</div>
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
