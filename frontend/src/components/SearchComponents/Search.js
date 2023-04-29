import React, { useContext, useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";
import RecipeItem from "../RecipeItem";

import recipeContext from "../../context/recipe/recipeContext";
import alertContext from "../../context/alert/alertContext";
import spinnerContext from "../../context/spinner/spinnerContext";

function Search() {
  	const [type_state, set_type_state] = useState("");
  	const [searchTerm, setSearchTerm] = useState("");
  	const [searchCategory, setSearchCategory] = useState("name");
	const { showAlert } = useContext(alertContext);
  	const { recipes, searchRecipe } = useContext(recipeContext);
	const { setLoading } = useContext(spinnerContext);
	
	const placeholderText = {
		"name": "Enter name of the dish...",
		"time": "Enter time in minutes...",
		"ingredients": "Enter like cheese, butter,...",
		"cuisine": "Select Cuisine...",
		"type": "Select Type...",
	}

  	const handleSubmit = async (event) => {
    	event.preventDefault();
		setLoading(true);

		let response = null
    	// veg_name, time_to_make, ingredients, cuisine, type
		if (searchCategory === "name") 
			response = await searchRecipe(searchTerm); // rest are all undefined
		else if (searchCategory === "time")
			response = await searchRecipe(undefined, searchTerm); // rest are all undefined
		else if (searchCategory === "ingredients")
			response = await searchRecipe( undefined, undefined, searchTerm.split(",")); // rest are all undefined
		else if (searchCategory === "cuisine")
			response = await searchRecipe(undefined, undefined, undefined, searchTerm);
		else //if (searchCategory === "type")
			response = await searchRecipe(undefined, undefined, undefined, undefined, searchTerm);

		setLoading(false);
		
		if (response.total !== undefined)
            showAlert(`Found ${response.total} new recipe(s)`, "info");
        else    
            showAlert(response.errors.join("\n"), "danger");
		
  	};

  	const handleSearchTermChange = (event) => {
    	if (searchCategory === "type") {
      		setSearchTerm(type_state);
		}
    	else 
			setSearchTerm(event.target.value);
  	};

  	const setToName = () => {
    	set_type_state("veg/nonveg");
    	setSearchCategory("name");
		setSearchTerm("");
  	};
  	const setToIngre = () => {
    	set_type_state("veg/nonveg");
    	setSearchCategory("ingredients");
		setSearchTerm("");
  	};
  	const setTotime = () => {
	    set_type_state("veg/nonveg");
	    setSearchCategory("time");
		setSearchTerm("");
  	};
  
  
  	const changeColor = () => {};
  
  	const handleCategoryChangeCuisine = (e) => {
    	setSearchCategory('cuisine');
    	setSearchTerm(e.target.value);
  	};
  	const handleCategoryChangeType = (e) =>{
	    setSearchCategory('type')
	    setSearchTerm(e.target.value);
  	}
  	const getClass = (btn_name) => {
	    if (btn_name === searchCategory) {
      		return "blackButton";
    	}
    	return "whiteButton";
  	};

  	return (
    	<div>
      		<div className="main">
        		<div className="headText">
          			<h1>
            			Search
            			<span>Search your Favorite Recipes Here</span>
          			</h1>
        		</div>
        		
				<div className="body_search">
					<form className="d-flex justify-content-center align-items-center flex-wrap" name="search">
						<input
							type="text"
							className="input"
							name="txt"
							value={searchTerm}
							onChange={handleSearchTermChange}
							placeholder={placeholderText[searchCategory]}
							minLength={3} maxLength={200}
						/>
						<button type="submit" onClick={handleSubmit} id="submitButton">
							Search
						</button>
					</form>
        		</div>
        		
				<div className="searchCat">
          			<button
            			className={getClass("name")}
            			id="name"
            			value={searchCategory}
            			onClick={() => {
              				setToName();
              				changeColor(this);
            			}}
          			>
            			name
          			</button>
          			
					<button
            			className={getClass("time")}
            			id="time"
            			value={searchCategory}
            			onClick={() => {
              				setTotime();
              				changeColor(this);
            			}}		
          			>
            			Time
          			</button>

          			<select className='dropDown' id="category-select-type" onChange={handleCategoryChangeType}>
						<option value="">Veg/Non-Veg</option>
              			<option value="Veg">Veg</option>
              			<option value="Non-Veg">Non-veg</option>
              			<option value="Vegan">Vegan</option>
            		</select>

        
            		<select className='dropDown' id="category-select-cuisine" onChange={handleCategoryChangeCuisine}>
              			<option value="">Cuisine</option>
              			<option value="Russian">Russian</option>
              			<option value="Indian">Indian</option>
              			<option value="Italian">Italian</option>
						        <option value="Mexican">Mexican</option>
              			<option value="Chinese">Chinese</option>
              			<option value="Mediterranean">Mediterranean</option>
              			<option value="French">French</option>
            		</select>  
          		
					<button
            			className={getClass("ingredients")}
            			id="ing"
            			value={searchCategory}
            			onClick={() => {
	              			setToIngre();
            				changeColor(this);
            			}}
          			>
	            		Ingredients
          			</button>

					<Link
            			className="btn whiteButton"
            			id="multiFilter"
            			value={searchCategory}
            			to="/multisearch"
          			>
	            		Multi-Filter Search
          			</Link>
        		</div>
			</div>
      		<div>
        		<div
          			className="d-flex flex-wrap justify-content-around"
          			style={{ backgroundColor: "#8fc4b7" }}
        		>
					{recipes !== undefined && recipes.length > 0 ? (
						recipes.map((entry) => {
							return (
								<RecipeItem
									key={entry._id}
									image={entry.image_url}
									title={entry.name}
									typearea={entry.type}
									cuisinearea={entry.cuisine}
									duration={entry.minutesToCook}
									text={entry.description}
									recipeLink={`/recipe/${entry._id}`}
								/>
							);
						})
					) : (
            			<p>No results found.</p>
          			)}
				</div>
	    </div>
    	</div>
  	);
}

export default Search;
