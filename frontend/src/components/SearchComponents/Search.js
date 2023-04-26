import React, { useContext, useState } from "react";
import "./Search.css";

import recipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "../RecipeItem";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("meals");
    const { recipes, searchRecipe } = useContext(recipeContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (searchCategory === "meals") {
            await searchRecipe( searchTerm, undefined, undefined, undefined, undefined);
        } else if (searchCategory === "ingredients") {
            await searchRecipe( undefined, undefined, searchTerm.split(","), undefined, undefined);
        } else if (searchCategory === "time") {
            await searchRecipe( undefined, searchTerm, undefined, undefined, undefined);
        } else if (searchCategory === "rating") {
            await searchRecipe( undefined, undefined, undefined, undefined, searchTerm);
        } else if (searchCategory === "cuisine") {
            await searchRecipe( undefined, undefined, undefined, searchTerm, undefined);
        }
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const setToName = () => {
        setSearchCategory("meals");
    };
    const setToIngre = () => {
        setSearchCategory("ingredients");
    };
    const setTotime = () => {
        setSearchCategory("time");
    };
    const setToRating = () => {
        setSearchCategory("rating");
    };
    const setTocuisine = () => {
        setSearchCategory("cuisine");
    };

    const changeColor = () => {};

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
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                id="submitButton"
                            >
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
                    <button
                        className={getClass("rating")}
                        id="rating"
                        value={searchCategory}
                        onClick={() => {
                            setToRating();
                            changeColor(this);
                        }}
                    >
                        Rating
                    </button>
                    
                    <button
                        className={getClass("cuisine")}
                        id="cuisine"
                        value={searchCategory}
                        onClick={() => {
                            setTocuisine();
                            changeColor(this);
                        }}
                    >
                        Cuisine
                    </button>
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
                <div className="d-flex flex-wrap justify-content-around">
                    {recipes !== undefined && recipes.length > 0
                        ? recipes.map((recipe) => {
                              return (
                                  <RecipeItem
                                      key={recipe._id}
                                      image="https://www.manjulaskitchen.com/wp-content/uploads/punjabi_aloo_paratha.jpg"
                                      title={recipe.name}
                                      subtitle={`${recipe.minutesToCook} min`}
                                      text={recipe.description}
                                      recipeLink="/search"
                                  />
                              );
                          })
                        : <p>No results found.</p>
                        }
                </div>
            </div>
        </div>
    );
}

export default Search;
