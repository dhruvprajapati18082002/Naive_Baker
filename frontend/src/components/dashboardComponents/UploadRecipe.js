import React, { useContext, useEffect, useState } from 'react'
import recipeContext from '../../context/recipe/recipeContext';
import alertContext from "../../context/alert/alertContext";
import { useNavigate } from "react-router-dom";
// import './boxstyle.css'

export default function UploadRecipe() {

    const  { uploadRecipe } = useContext(recipeContext);
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();

    const [cred, setCred] = useState({
        name: "",
        description: "",
        cuisine: "",
        ingredients: "",
        minutesToCook: "",
        type: "",
        steps: "",
        image_url: ""
    });

    const onChangeHandler = (event) => {
        setCred({...cred, [event.target.id]: event.target.value});
    }

    useEffect(() => {
        if (!localStorage.getItem("token")){
            showAlert("Please Login First !", "warning");
            navigate("/login");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const ingredients = cred.ingredients.split("\n");
        const steps = cred.steps.split("\n");

        const res = await uploadRecipe(cred.name, cred.description, cred.cuisine, cred.type, cred.minutesToCook, cred.image_url, ingredients, steps);
        
        if (res._id !== undefined){
            showAlert("Recipe Succesfully Added", "success")
            navigate(`/recipe/${res._id}`);
        }
        else
            showAlert("Failed to add recipe !", "danger");
      };

    return (
        <section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-8 col-xl-6">
                    <div className="card rounded-3">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Upload Recipe</h3>

                        <form onSubmit={handleSubmit} className="px-md-2">
                            
                            {/* this is for name input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="recipename">Recipe Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    required
                                    onChange={onChangeHandler}
                                    value={cred.name}
                                    minLength={5}
                                    maxLength={20}
                                />
                            </div>

                            {/* this is for description */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description of Recipe*</label>
                                <textarea className="form-control" 
                                id="description"
                                rows="3"
                                required 
                                onChange={onChangeHandler}
                                value={cred.description}
                                minLength={10} 
                                maxLength={150} />
                            </div>


                            {/* this is for cuisine */}
                            <div className="form-outline mb-4">
                                <label htmlFor="cuisine" className="form-label">Enter Cuisine*</label>
                                    <input className="form-control" 
                                    list="types" 
                                    id="cuisine" 
                                    placeholder="Type to search..."
                                    value={cred.cuisine}
                                    onChange={onChangeHandler}
                                    required
                                    />
                                    <datalist id="types">
                                        <option value="Indian" />
                                        <option value="French" />
                                        <option value="Italian" />
                                        <option value="Mexican" />
                                        <option value="Chinese" />
                                        <option value="Mediterranean" />
                                        <option value="Russian" />
                                    </datalist>
                            </div>
                            
                            {/* this is for veg/non-veg */}
                            <div className="form-outline mb-4">
                                <label htmlFor="cuisinetype" className="form-label">Type*</label>
                                    <input className="form-control" 
                                    list="cuisineoptions" 
                                    id="type"
                                    value={cred.type}
                                    onChange={onChangeHandler} 
                                    placeholder="Type to search...veg/non-veg/vegan"
                                    required
                                    />
                                    <datalist id="cuisineoptions">
                                        <option value="Veg" />
                                        <option value="Non-Veg" />
                                        <option value="Vegan" />
                                    </datalist>
                            </div>
                            {/* this is duration */}
                            <div className="form-outline mb-4">
                                <label htmlFor="recipeduration" className="form-label">Duration*</label>
                                    <input className="form-control" 
                                    type="number" 
                                    id="minutesToCook"
                                    value={cred.minutesToCook}
                                    onChange={onChangeHandler} 
                                    placeholder="in minutes.."
                                    required
                                    />
                            </div>

                            {/* this is for ingredients */}
                            <div className="mb-3">
                                <label htmlFor="ingrediant" className="form-label">Ingredients*</label>
                                <textarea className="form-control" 
                                id="ingredients"
                                value={cred.ingredients}
                                onChange={onChangeHandler} 
                                rows="3" 
                                placeholder='begin new ingrediant from new line...'
                                required />
                            </div>
  

                            {/* this is for steps of recipe */}
                            <div className="mb-3">
                                <label htmlFor="recipetutorial" className="form-label">Step by step tutorial*</label>
                                <textarea className="form-control" 
                                id="steps"
                                value={cred.steps}
                                onChange={onChangeHandler} 
                                rows="3" 
                                placeholder='begin new step from new line...'
                                required />
                            </div>
                            
                            {/* this is for image upload */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="recipeimage">Image*</label>
                                <input
                                    type="text"
                                    id="image_url"
                                    onChange={onChangeHandler}
                                    value={cred.image_url}
                                    className="form-control"
                                    placeholder="enter image URL"
                                />
                            </div>

                            <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>

                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}