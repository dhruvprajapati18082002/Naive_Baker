import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import alertContext from "../context/alert/alertContext";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND;

const RecipePage = () => {

    const navigate = useNavigate();
    const { recipeId } = useParams();
    const { showAlert } = useContext(alertContext);

    const [ recipeDisplayed, setRecipeDisplayed ] = useState({});


    useEffect( () => {
        if (!localStorage.getItem("token"))
        {
            showAlert("Login First to View the Recipe", "warning");
            navigate("/login");
        }
        else{
            axios.get(
                `${BACKEND}/api/recipe/fetchrecipe/${recipeId}`, {
                        headers: {
                            "auth-token" : localStorage.getItem("token"),
                        }
                    }
                ).then(res => {
                    setRecipeDisplayed(res.data.recipes);
                }).catch(error => {
                    showAlert("Error Fetching the Required Recipe", "danger");
                    navigate("/");
                })
        }
    }, [])


    return (
        <div style={{backgroundColor: "#8fc4b7"}}>
            <div className="container">
                <p className="h1 text-center">{recipeDisplayed.name}</p>

                <div className="d-flex">
                    <div className="container my-5 align-items-center justify-content-center" style={{width: "fit-content"}}>
                        <img
                            src={recipeDisplayed.image_url}
                            // src="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                            className="card-img-top"
                            alt="..."
                            style={{ width: "30rem", height: "20rem" }}
                        />
                        {/* blocks to display time to cook, cuisine and average ratings */}
                        <div className="d-flex justify-content-around my-1" style={{width: "30rem"}}>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Cooking Time:</strong></div>
                                    <div className="card-text">{recipeDisplayed.minutesToCook} Min</div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Cuisine Type:</strong></div>
                                    <div className="card-text">{recipeDisplayed.cuisine}</div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Avg Ratings:</strong></div>
                                    <div className="card-text">{recipeDisplayed.ratings}</div>
                                </div>
                            </div>
                        </div>
                        {/* blocks to display time to cook, cuisine and average ratings */}
                    
                    </div>
                    {/* Description, Steps and Ingredients start here */}
                    <div className="container">

                        {/* description */}
                        <div className="container my-3">
                            <p className="h2">Description</p>
                            <ul className="list-group">
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>
                                    {recipeDisplayed.description}
                                </li>
                            </ul>
                        </div>
                        {/* description */}
                        
                        {/* ingredients */}
                        <div className="container my-3">
                            <p className="h2">Ingredients</p>
                            <div className="d-flex flex-wrap">
                                {
                                    recipeDisplayed.ingredients !== undefined && recipeDisplayed.ingredients.map((ingredient, key) => {
                                        return (
                                            <h5 key={key}><div className="badge bg-secondary mx-1">{ingredient}</div></h5>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* ingredients */}

                        {/* steps */}
                        <div className="container my-3">
                            <p className="h2">Steps</p>
                            <div className="list-group list-group-numbered">
                                {
                                    recipeDisplayed.steps !== undefined && recipeDisplayed.steps.map((step, key) =>{
                                        return (
                                            <li className="list-group-item h6 shadow-lg" key={key} style={{backgroundColor: "#6da295"}}>{step}</li>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* steps */}
                    </div>
                    {/* Description, Steps and Ingredients end here */}
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
