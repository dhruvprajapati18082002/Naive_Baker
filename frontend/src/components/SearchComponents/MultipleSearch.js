import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import recipeContext from '../../context/recipe/recipeContext';
import alertContext from "../../context/alert/alertContext";
import spinnerContext from '../../context/spinner/spinnerContext';

import RecipeItem from "../RecipeItem";

export default function MultiSearch() {
    const { recipes, searchRecipe } = useContext(recipeContext);
    const { showAlert } = useContext(alertContext);
    const { setLoading } = useContext(spinnerContext);
    const navigate = useNavigate();

    const [cred, setCred] = useState({
        name: "",
        cuisine: "",
        ingredients: "",
        minutesToCook: "",
        type: "",
        satisfyAll: true
    });

    const onChangeHandler = (event) => {
        setCred({...cred, [event.target.id]: event.target.value});
    }

    const handleToggle1 = () => {
        setCred({...cred, satisfyAll: true})
    }
    const handleToggle2 = () => {
        setCred({...cred, satisfyAll: false})
    }

    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("token")){
            showAlert("Please Login First !", "warning");
            navigate("/login");
        }
        setLoading(false);
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const ingredients = cred.ingredients.split("\n").filter(ingredient => {return ingredient.length > 0})

        // veg_name, time_to_make, ingredients, cuisine, type
        const response = await searchRecipe(cred.name,cred.minutesToCook,ingredients,cred.cuisine,cred.type,cred.satisfyAll)
        setLoading(false);
        
        if (response.total !== undefined)
            showAlert(`Found ${response.total} new recipe(s)`, "info");
        else    
            showAlert(response.errors.join("\n"), "danger");
      };

    return (
        <section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-8 col-xl-6">
                    <div className="card rounded-3">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2"><center>Multiple Filter Search</center></h3>

                        <form onSubmit={handleSubmit} className="px-md-2">
                            
                            
                            {/* this is for name input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="recipename">Recipe Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    
                                    onChange={onChangeHandler}
                                    value={cred.name}
                                    minLength={5}
                                    maxLength={100}
                                />
                            </div>


                            {/* this is for cuisine */}
                            <div className="form-outline mb-4">
                                <label htmlFor="cuisine" className="form-label">Enter Cuisine</label>
                                    <select className="form-select" 
                                    id="cuisine" 
                                    value={cred.cuisine}
                                    onChange={onChangeHandler}
                                    >
                                        <option value="">Select Cuisine...</option>
                                        <option value="Indian">Indian</option>
                                        <option value="French">French</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Maxican">Mexican</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="Russian">Russian</option>
                                    </select>
                            </div>
                            
                            {/* this is for veg/non-veg */}
                            <div className="form-outline mb-4">
                                <label htmlFor="cuisinetype" className="form-label">Type</label>
                                    <select className="form-select"
                                    id="type"
                                    value={cred.type}
                                    onChange={onChangeHandler} 
                                    >
                                        <option value="">Type to search...veg/non-veg/vegan</option>
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                            </div>

                            {/* this is duration */}
                            <div className="form-outline mb-4">
                                <label htmlFor="minutesToCook" className="form-label">Duration</label>
                                <div className='input-group'>
                                    <input className="form-control" 
                                    type="number" 
                                    id="minutesToCook"
                                    value={cred.minutesToCook}
                                    onChange={onChangeHandler} 
                                    placeholder="in minutes.."
                                    min="1"
                                    max="240"
                                    />
                                    <label className='input-group-text'>Minutes</label>
                                </div>
                            </div>

                            {/* this is for ingredients */}
                            <div className="mb-3">
                                <label htmlFor="ingredients" className="form-label">Ingredients</label>
                                    <textarea className="form-control" 
                                    id="ingredients"
                                    value={cred.ingredients}
                                    onChange={onChangeHandler} 
                                    rows="3" 
                                    placeholder='begin new ingredient from new line...'
                                    minLength={3}
                                    maxLength={200}
                                 />
                            </div>

                            {/* this is for satisfyAll */}
                            <div className='mb-3 d-flex justify-content-around'>
                                <input type="radio" className="btn-check" name="satisfyAll" id="SatisfyAllConstraints" value={cred.satisfyAll} onChange={handleToggle1} autoComplete="off" defaultChecked={true} />
                                <label className="btn btn-outline-success" htmlFor="SatisfyAllConstraints">Satisfy All of The Constraints</label>

                                <input type="radio" className="btn-check" name="satisfyAll" id="SatisfyAtleastOneConstraint" value={cred.satisfyAll} onChange={handleToggle2} autoComplete="off" />
                                <label className="btn btn-outline-success" htmlFor="SatisfyAtleastOneConstraint">Satisfy Atleast One Constraint</label>
                            </div>

                           <center><button type="submit" className="btn btn-success btn-lg mb-1">Search</button></center>

                        </form>

                    </div>
                    </div>
                    
                </div>
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
        </section>
    )
}