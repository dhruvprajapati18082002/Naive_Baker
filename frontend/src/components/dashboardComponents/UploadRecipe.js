import React, { useContext, useEffect, useState } from 'react'
import recipeContext from '../../context/recipe/recipeContext';
import alertContext from "../../context/alert/alertContext";
import { useNavigate } from "react-router-dom";
// import './boxstyle.css'

export default function UploadRecipe() {

    const  { uploadRecipe } = useContext(recipeContext);
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")){
            showAlert("Please Login First !", "warning");
            navigate("/login");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = document.getElementById("recipename").value;
        const description = document.getElementById("description").value;
        const cuisine = document.getElementById("cuisine").value;
        const duration = document.getElementById("recipeduration").value;
        const type = document.getElementById("type").value;
        let steps = document.getElementById("recipetutorial").value;

        steps = steps.split("\n").filter((element)=>{return element.length !== 0})
        
        const res = await uploadRecipe(name, description, cuisine, duration, ingredients, steps, type);
        
        if (res._id !== undefined){
            showAlert("Recipe Succesfully Added", "success")
            navigate(`/recipe/${res._id}`);
        }
        else
            showAlert("Failed to add recipe !", "danger");
      };

    const [ingredients, setIngredients] = useState([]);
    
    const addIngredients = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setIngredients([...ingredients, e.target.value]);
          e.target.value = "";
        }
      }
    };
    const removeIngredients = (ingredientToRemove) => {
      const newIngredients = ingredients.filter((ingredient) => ingredient !== ingredientToRemove);
      setIngredients(newIngredients);
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
                                    id="recipename"
                                    name="recipename"
                                    className="form-control"
                                    required
                                    minLength={4}
                                    maxLength={17}
                                />
                            </div>

                            {/* this is for description */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description of Recipe*</label>
                                <textarea className="form-control" 
                                id="description" 
                                rows="3" 
                                required 
                                minLength={10} 
                                maxLength={200} />
                            </div>


                            {/* this is for cuisine */}
                            <div className="form-outline mb-4">
                                <label htmlFor="cuisine" className="form-label">Enter Cuisine*</label>
                                    <input className="form-control" 
                                    list="types" 
                                    id="cuisine" 
                                    placeholder="Type to search..."
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
                                    id="recipeduration" 
                                    placeholder="in minutes.."
                                    required
                                    />
                            </div>

                            {/* this is for ingredients */}
                            <div className="form-outline mb-4">
                            <label htmlFor="boxes">Ingredients*</label>
                                <div className="form-control" id="boxes" >
                                    {ingredients.map((ingredient, index) => {
                                    return (
                                        <div key={index} >

                                        {ingredient} <span style={{cursor: "pointer"}} onClick={() => removeIngredients(ingredient)} >X</span>
                                        </div>
                                    );
                                    })}
                                    
                                    <input onKeyDown={addIngredients} />
                                </div>
                                </div>
  

                            {/* this is for steps of recipe */}
                            <div className="mb-3">
                                <label htmlFor="recipetutorial" className="form-label">Step by step tutorial*</label>
                                <textarea className="form-control" 
                                id="recipetutorial" 
                                rows="3" 
                                placeholder='begin new step from new line...'
                                required />
                            </div>
                            
                            {/* this is for image upload */}
                            {/* <div className="form-group">
                                <label htmlFor="photo">Upload a Photo*</label>
                                <input type="file" className="form-control-file" 
                                id="photo"
                                />
                            </div> */}

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