import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";

import alertContext from "../context/alert/alertContext";
import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");
const CONTAINER_COLOR = "#FDFEFB";

const RecipePage = () => {

    const navigate = useNavigate();
    const { recipeId } = useParams();
    const { showAlert } = useContext(alertContext);

    const [ recipeDisplayed, setRecipeDisplayed ] = useState({});
    const [ isRecipeOwner, setIsRecipeOwner ] = useState(false);
    
    const capitalize = (statement) => {
        let words = statement.split(" ").filter( (word) => { return word.length > 0 } );

        for (let i = 0; i < words.length; i++)
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();

        return words.join(" ");
    };

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
                    setIsRecipeOwner(res.data.isOwned);
                    console.log(isRecipeOwner);
                }).catch(error => {
                    showAlert("Error Fetching the Required Recipe", "danger");
                    navigate("/");
                })
        }
    }, [])


    return (
        <div style={{backgroundColor: "#8fc4b7"}}>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <p className="h1 text-center mx-2 my-4"
                        style={{ fontSize: 50, color:"#083221", fontWeight: "bold", fontFamily: "BunchBlossomsPersonalUse-0nA4"}}
                    >
                        {recipeDisplayed.name !== undefined && capitalize(recipeDisplayed.name)}
                    </p>
                    { isRecipeOwner && <i className="bi bi-pen-fill mx-2" style={{opacity:0.7, cursor: "pointer"}} /> }
                    { isRecipeOwner && <i className="bi bi-trash3-fill" style={{opacity:0.7, cursor: "pointer"}} /> }
                </div>
                <div className="d-flex">
                    <div className="container my-5 align-items-center justify-content-center" style={{width: "fit-content"}}>
                        <img
                            src={recipeDisplayed.image_url}
                            // src="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                            className="card-img-top rounded"
                            alt="..."
                            style={{ width: "30rem", height: "20rem" }}
                        />
                        {/* blocks to display time to cook, cuisine and average ratings */}
                        <div className="d-flex justify-content-around my-1" style={{width: "30rem"}}>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "50%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong><center>Cooking Time:</center></strong></div>
                                    <div className="card-text"><center>{recipeDisplayed.minutesToCook} Min</center></div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "50%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong><center>Cuisine Type:</center></strong></div>
                                    <div className="card-text"><center>{recipeDisplayed.cuisine}</center></div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Avg Ratings:</strong></div>
                                    <div className="card-text">{recipeDisplayed.ratings}</div>
                                </div>
                            </div>
                        </div>
                        {/* blocks to display time to cook, cuisine and average ratings */}
                    
                    </div>
                    {/* Description, Steps and Ingredients start here */}
                    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">

                        {/* description */}
                        <div className="container my-3">
                            <p className="h3" style={{fontFamily: "BunchBlossomsPersonalUse-0nA4"}} >Description</p>
                            <ul className="list-group">
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: CONTAINER_COLOR}}>
                                    {recipeDisplayed.description}
                                </li>
                            </ul>
                        </div>
                        {/* description */}
                        
                        {/* ingredients */}
                        <div className="container my-3">
                            <p className="h3" style={{fontFamily: "BunchBlossomsPersonalUse-0nA4"}} >Ingredients</p>
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
                            <p className="h3" style={{fontFamily: "BunchBlossomsPersonalUse-0nA4"}} >Steps</p>
                            <div className="list-group list-group-numbered">
                                {
                                    recipeDisplayed.steps !== undefined && recipeDisplayed.steps.map((step, key) =>{
                                        return (
                                            <li className="list-group-item h6 shadow-lg" key={key} style={{backgroundColor: CONTAINER_COLOR}}>{step}</li>
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