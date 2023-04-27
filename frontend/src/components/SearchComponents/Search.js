import React, { useEffect, useContext, useState } from "react";
import "./Search.css";
import recipeContext from "../../context/recipe/recipeContext";
import RecipeItem from "../RecipeItem";

function Search() {
  const [type_state, set_type_state] = useState("");
  const [cuisine_s, setCuisine_s] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("meals");
  const { recipes, searchRecipe } = useContext(recipeContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event) => {
    // console.log('here in handle submit button pe click wala')
    // console.log(searchTerm)
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
    } else if (searchCategory === "rating") {
      await searchRecipe(
        undefined,
        undefined,
        undefined,
        undefined,
        searchTerm
      );
    } else if (searchCategory === "cuisine") {
      // console.log("in cuising");
      // console.log(searchTerm)
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
    // console.log(event)
    // console.log("dumb")
    // console.log(event.target.value);
    // if (searchCategory === "cuisine") {
    //   // console.log(searchCategory);
    //   // console.log(cuisine_s)
    //   setSearchTerm(cuisine_s);
    //   console.log("searchTerm =" + searchTerm);
    if (searchCategory === "type") {
      setSearchTerm(type_state);
    }
    else setSearchTerm(event.target.value);
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
    setSearchCategory("rating")
  }
  const setToCuisine = (props) => {
    // useEffect(()=>{
    //   setSearchCategory('cuisine');
    //   setSearchTerm(props);
    // }, [searchCategory, searchTerm])

    // console.log("insettoasd");
    setSearchCategory("cuisine");
    // setCuisine_s(props)
    // console.log(" cat : " + searchCategory);
  };
  const changeColor = () => {};
  
  const handleCategoryChangeCuisine = (e) => {
    setSearchCategory('cuisine');
    setSearchTerm(e.target.value);
  };
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

          <div>
            {/* <label htmlFor="category-select">Choose a category:</label> */}
            <select className={getClass("cuisine")} id="category-select" onChange={handleCategoryChangeCuisine}>
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

          {/*                     
                    <div className="dropdown">
                      <button className={getClass("cuisine")} onClick={handleDropDown}>Cuisine</button>
                      {open ? (
                        <ul className="menu">
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('French'); setToCuisine(); console.log(cuisine_s); console.log(cuisine_s + " searchCategory :" + searchCategory+ "searchTerm : " + searchTerm);}}>French</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('Indian');  setToCuisine();  console.log(cuisine_s + " searchCategory : " + searchCategory+ "searchTerm : " + searchTerm);}}>Indian</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('Italian'); setToCuisine();  console.log(cuisine_s +" searchCategory : " + searchCategory+ "searchTerm : " + searchTerm);}}>Italian</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('Mexican'); setToCuisine();  console.log(cuisine_s +" searchCategory : " + searchCategory+ "searchTerm : " + searchTerm);}}>Mexican</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('Chinese'); setToCuisine();  console.log(cuisine_s + " searchCategory : " + searchCategory+ " searchTerm : " + searchTerm);}}>Chinese</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={()=>{setCuisine_s('Mediterranean'); setToCuisine(); console.log(cuisine_s + " searchCategory : " + searchCategory + " searchTerm : " + searchTerm);}}>Mediterranean</button>
                          </li>
                          <li className="menu-item">
                            <button onClick={handleClickMultiple}>Russian</button>
                          </li>
                        </ul>
                      ) : null}
                      
                    </div> */}
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
