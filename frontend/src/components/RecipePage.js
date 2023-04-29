import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";
import axios from "axios";

import alertContext from "../context/alert/alertContext";
import recipeContext from "../context/recipe/recipeContext";
import spinnerContext from "../context/spinner/spinnerContext";
 
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");
const CONTAINER_COLOR = "#FDFEFB";

const RecipePage = () => {

    const ref = useRef(null);
    const refClose = useRef(null);

    const navigate = useNavigate();
    const { recipeId } = useParams();
    const { showAlert } = useContext(alertContext);
    const { editRecipe, deleteRecipe } = useContext(recipeContext);
    const { setLoading } = useContext(spinnerContext);

    const [ recipeDisplayed, setRecipeDisplayed ] = useState({});
    const [ isRecipeOwner, setIsRecipeOwner ] = useState(false);
    const [ owner, setOwner ] = useState("");
    
    const capitalize = (statement) => {
        let words = statement.split(" ").filter( (word) => { return word.length > 0 } );

        for (let i = 0; i < words.length; i++)
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();

        return words.join(" ");
    };

    useEffect( () => {
        setLoading(true);
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
                    setRecipeDisplayed(res.data.recipes[0]);
                    setIsRecipeOwner(res.data.isOwned);
                    setOwner(res.data.owner);
                }).catch(error => {
                    const msg = error.response.data.errors.join("\n");
                    showAlert(msg, "danger");
                    navigate("/");
                })
        }
        setLoading(false);
    }, [])

    const [ newRecipe, setNewRecipe ] = useState({})

    const onChangeHandler = (event) => {
        setNewRecipe({ ...newRecipe, [event.target.id]: event.target.value });
    }
    
    const handleSubmit = async (event) => {
        // name, description, minutesToCook, Ingredients, steps, image_url
        const newIngredients = newRecipe.editIngred.split("\n").filter(element => { return element.length > 0 });
        const newSteps = newRecipe.editSteps.split("\n").filter(element => { return element.length > 0 });

        const data = await editRecipe(newRecipe.id, newRecipe.editName, newRecipe.editDescr, newRecipe.editMinutesToCook, newIngredients, newSteps, newRecipe.editImageUrl, newRecipe.editCuisine, newRecipe.editType);

        if (data.recipes !== undefined){
            showAlert("Updated Successfully", "success");
            setRecipeDisplayed(data.recipes[0]);
        }
        else{
            showAlert(data.errors.join("\n"), "danger");
        }
        refClose.current.click();
    };

    const updateRecipe = () => {
        ref.current.click();
        setNewRecipe({
            id: recipeDisplayed._id,
            editName: recipeDisplayed.name, 
            editDescr: recipeDisplayed.description,
            editCuisine: recipeDisplayed.cuisine,
            editType: recipeDisplayed.type,
            editMinutesToCook: recipeDisplayed.minutesToCook,
            editIngred: recipeDisplayed.ingredients.join("\n"),
            editSteps: recipeDisplayed.steps.join("\n"),
            editImageUrl: recipeDisplayed.image_url,
        });
    }

    const handleDelete = async () => {
        const response = await deleteRecipe(recipeDisplayed._id);
        if (response.recipes !== undefined){
            showAlert("Recipe Deleted Successfully", "success");
            navigate("/dashboard");
        }
        else
            showAlert(response.errors.join("\n"), "danger");
    }

    return (
        <div style={{backgroundColor: "#8fc4b7"}}>

            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#editRecipeModal"
            >
                Launch demo modal
            </button>

            {/* Modal to Display Edit Recipe Pop-up Begins Here */}
            <div
                className="modal fade"
                id="editRecipeModal" tabIndex="-1" aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Recipe
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <label htmlFor="editTitle" className="input-group-text" >
                                        Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={newRecipe.editName} 
                                        id="editName"
                                        onChange={onChangeHandler} 
                                        minLength={5} required
                                        maxLength={100}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="editDescr" className="input-group-text" >
                                        description
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={newRecipe.editDescr}
                                        id="editDescr"
                                        onChange={onChangeHandler}
                                        minLength={10} maxLength={250} required
                                    />
                                </div>
                                <div className="input-group mb-4">
                                    <label htmlFor="editCuisine" className="input-group-text">Cuisine</label>
                                    <select className="form-select" 
                                    id="editCuisine" 
                                    placeholder="Type to search..."
                                    value={newRecipe.editCuisine}
                                    onChange={onChangeHandler}
                                    required
                                    >
                                        <option value="Indian">Indian</option>
                                        <option value="French">French</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="Russian">Russian</option>
                                    </select>
                                </div>
                                <div className="input-group mb-4">
                                    <label htmlFor="editType" className="input-group-text">Type</label>
                                    <select className="form-select"
                                    id="editType"
                                    value={newRecipe.editType}
                                    onChange={onChangeHandler} 
                                    placeholder="Type to search...veg/non-veg/vegan"
                                    required
                                    >
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="editMinutesToCook" className="input-group-text" >
                                        Time To Cook
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newRecipe.editMinutesToCook}
                                        id="editMinutesToCook"
                                        onChange={onChangeHandler}
                                        required
                                        min="1"
                                        max="240"
                                    />
                                    <label htmlFor="editMinutesToCook" className="input-group-text" >Minutes</label>
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="editIngred" className="input-group-text" >
                                        Ingredients
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={newRecipe.editIngred}
                                        id="editIngred"
                                        onChange={onChangeHandler}
                                        row="5" required
                                        minLength={5} maxLength={500}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="editSteps" className="input-group-text" >
                                        Steps
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={newRecipe.editSteps}
                                        id="editSteps"
                                        onChange={onChangeHandler}
                                        row={5} required
                                        minLength={50} maxLength={1000}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <label htmlFor="editImageUrl" className="input-group-text" >
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newRecipe.editImageUrl}
                                        id="editImageUrl"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </form>
    
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                ref={refClose}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal to Display Edit Recipe Pop-up Ends Here */}

            {/* Recipe Page Begins Here */}
            <div >
                <div className="d-flex justify-content-center align-items-center mx-5">
                    <p className="h1 text-center mx-2 my-4"
                        style={{ fontSize: 50, color:"#083221", fontWeight: "bold", fontFamily: "BunchBlossomsPersonalUse-0nA4"}}
                    >
                        {recipeDisplayed.name !== undefined && capitalize(recipeDisplayed.name)}
                    </p>
                    { isRecipeOwner && <i className="bi bi-pen-fill mx-2" style={{opacity:0.7, cursor: "pointer"}} onClick={() => {updateRecipe()}}/> }
                    { isRecipeOwner && <i className="bi bi-trash3-fill" style={{opacity:0.7, cursor: "pointer"}} onClick={() => {handleDelete()}} /> }
                </div>
                <div className="d-flex flex-wrap">
                    {/* Image and CookingTime/ChefName/CuisineType cards */}
                    <div className="container my-5 align-items-center justify-content-center" style={{width: "inherit"}}>
                        <img
                            src={recipeDisplayed.image_url}
                            // src="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                            className="card-img-top rounded img-fluid"
                            alt="..."
                            style={{ width: "inherit", maxHeight: "20rem" }}
                        />
                        {/* blocks to display time to cook, cuisine and average ratings */}
                        <div className="d-flex justify-content-around my-1" style={{width: "inherit"}}>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "50%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong><center>Cooking Time:</center></strong></div>
                                    <div className="card-text"><center>{recipeDisplayed.minutesToCook} Min</center></div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "50%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong><center>CHEF:</center></strong></div>
                                    <div className="card-text"><center>{owner}</center></div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: CONTAINER_COLOR, width: "50%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong><center>Cuisine Type:</center></strong></div>
                                    <div className="card-text"><center>{recipeDisplayed.cuisine}</center></div>
                                </div>
                            </div>
                        </div>
                        {/* blocks to display time to cook, cuisine and average ratings */}
                    
                    </div>
                    {/* Image and CookingTime/ChefName/CuisineType cards */}

                    {/* Description, Steps and Ingredients start here */}
                    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{maxWidth: "750px"}}>

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
            {/* Recipe Page Ends Here */}

        </div>
    );
};

export default RecipePage;