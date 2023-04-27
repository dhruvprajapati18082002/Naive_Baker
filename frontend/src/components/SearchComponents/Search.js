import React, { useContext, useState } from "react";
import "./Search.css";

import recipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "../RecipeItem";

function Search() {
  const [type_state, set_type_state] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("meals");
  const { recipes, searchRecipe } = useContext(recipeContext);
  

  const handleSubmit = async (event) => {
    console.log('here in handle submit button pe click wala')
    console.log(searchTerm)
    event.preventDefault();
    if (searchCategory === "meals") {
      await searchRecipe(
        searchTerm,
        undefined,
        undefined,
        undefined,
        undefined
      );
    } else if (searchCategory === "ingredients") {
      await searchRecipe(
        undefined,
        undefined,
        searchTerm.split(","),
        undefined,
        undefined
      );
    } else if (searchCategory === "time") {
      await searchRecipe(
        undefined,
        searchTerm,
        undefined,
        undefined,
        undefined
      );
    } else if (searchCategory === "type") {
      console.log(searchTerm);
      console.log("here in type");
      await searchRecipe(
        undefined,
        undefined,
        undefined,
        undefined,
        searchTerm
      );
    } else if (searchCategory === "cuisine") {
      console.log("in cuising");
      console.log(searchTerm)
      await searchRecipe(
        undefined,
        undefined,
        undefined,
        searchTerm,
        undefined
      );
    }
  };

  const handleSearchTermChange = (event) => {
    if (searchCategory === "type") {
      setSearchTerm(type_state);
    }
    else setSearchTerm(event.target.value);
  };

  const setToName = () => {
    set_type_state("veg/nonveg");
    setSearchCategory("meals");
  };
  const setToIngre = () => {
    set_type_state("veg/nonveg");
    setSearchCategory("ingredients");
  };
  const setTotime = () => {
    set_type_state("veg/nonveg");
    setSearchCategory("time");
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
          <div className="box_s">
            <form name="search">
              <input
                type="text"
                className="input"
                name="txt"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <button type="submit" onClick={handleSubmit} id="submitButton">
                {" "}
                Search{" "}
              </button>
            </form>
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="searchCat">
          <button
            className={getClass("meals")}
            id="meals"
            value={searchCategory}
            onClick={() => {
              setToName();
              changeColor(this);
            }}
          >
            Meals
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
          <select className='dropDown' id="category-select" onChange={handleCategoryChangeType}>
              <option value="">Veg/Non-Veg</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-veg</option>
            </select>

          <div>
            <select className='dropDown' id="category-select" onChange={handleCategoryChangeCuisine}>
              <option value="">Cuisine</option>
              <option value="Russian">Russian</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="French">French</option>
            </select>
          </div>

          
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
