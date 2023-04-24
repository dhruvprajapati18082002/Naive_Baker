import React from "react";

const RecipePage = () => {
    return (
        <div className="container" style={{ border: "solid 2px green" }}>
            <p className="h1 text-center">Pasta with White Sauce</p>

            <div className="d-flex">
                <div className="container align-items-center justify-content-center" style={{border: "2px solid orange", width: "fit-content"}}>
                    <img
                        src="https://cookingwithbry.com/wp-content/uploads/Paneer-Tikka-Masala-Recipe-1-735x735.jpg?_t=1678593746"
                        className="card-img-top"
                        alt="..."
                        style={{ width: "30rem", height: "20rem" }}
                    />
                    {/* blocks to display time to cook, cuisine and average ratings */}
                    <div className="d-flex justify-content-around my-1" style={{width: "30rem"}}>
                        <div className="card" style={{backgroundColor: "#e0e0e0", width: "33%"}}>
                            <div className="card-body">
                                <div className="card-title"><strong>Cooking Time:</strong></div>
                                <div className="card-text">30 Min</div>
                            </div>
                        </div>
                        <div className="card" style={{backgroundColor: "#e0e0e0", width: "33%"}}>
                            <div className="card-body">
                                <div className="card-title"><strong>Cuisine Type:</strong></div>
                                <div className="card-text">Italian</div>
                            </div>
                        </div>
                        <div className="card" style={{backgroundColor: "#e0e0e0", width: "33%"}}>
                            <div className="card-body">
                                <div className="card-title"><strong>Avg Ratings:</strong></div>
                                <div className="card-text">4.2</div>
                            </div>
                        </div>
                    </div>
                    {/* blocks to display time to cook, cuisine and average ratings */}
                
                </div>
                <div className="container" style={{border: "2px solid yellow"}}>
                    hello
                </div>
            </div>
        </div>
    );
};

export default RecipePage;
