import React from "react";

const RecipePage = () => {
    return (
        <div style={{backgroundColor: "#8fc4b7"}}>
            <div className="container">
                <p className="h1 text-center">Pasta with White Sauce</p>

                <div className="d-flex">
                    <div className="container my-5 align-items-center justify-content-center" style={{width: "fit-content"}}>
                        <img
                            src="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                            className="card-img-top"
                            alt="..."
                            style={{ width: "30rem", height: "20rem" }}
                        />
                        {/* blocks to display time to cook, cuisine and average ratings */}
                        <div className="d-flex justify-content-around my-1" style={{width: "30rem"}}>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Cooking Time:</strong></div>
                                    <div className="card-text">30 Min</div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Cuisine Type:</strong></div>
                                    <div className="card-text">Italian</div>
                                </div>
                            </div>
                            <div className="card" style={{backgroundColor: "#6da295", width: "33%"}}>
                                <div className="card-body">
                                    <div className="card-title"><strong>Avg Ratings:</strong></div>
                                    <div className="card-text">4.2</div>
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
                                    The creamy white sauce made with butter, flour, milk, and flavored with garlic, Parmesan cheese, and herbs.
                                Simply toss the sauce with your favorite pasta have a comforting and satisfying meal that will please the whole family.
                                </li>
                            </ul>
                        </div>
                        {/* description */}
                        
                        {/* ingredients */}
                        <div className="container my-3">
                            <p className="h2">Ingredients</p>
                            <div className="d-flex">
                                <h5><div className="badge bg-secondary mx-1" >pasta</div></h5>
                                <h5><div className="badge bg-secondary mx-1" >butter</div></h5>
                                <h5><div className="badge bg-secondary mx-1" >flour</div></h5>
                                <h5><div className="badge bg-secondary mx-1" >milk</div></h5>
                                <h5><div className="badge bg-secondary mx-1" >garlic</div></h5>
                                <h5><div className="badge bg-secondary mx-1" >cheese</div></h5>
                            </div>
                        </div>
                        {/* ingredients */}

                        {/* steps */}
                        <div className="container my-3">
                            <p className="h2">Steps</p>
                            <div className="list-group list-group-numbered">
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>Cook the pasta until al dente.</li>
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>Make a white sauce by melting butter, adding garlic, and whisking in flour and milk.</li>
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>Add Parmesan cheese to the sauce and stir until melted.</li>
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>Combine the pasta and sauce in a large pot and stir to coat the pasta.</li>
                                <li className="list-group-item h6 shadow-lg" style={{backgroundColor: "#6da295"}}>Serve hot and enjoy!</li>
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
