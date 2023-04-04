import React from "react";
import "./RecipeItem.css";


export default function RecipeItem(props) {
  return (
    <div className=" card">
      <div className="card text-center">
        <div className="card-header ">{props.header}</div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a href="#" className="btn btn-sm btn-primary">
            {props.btnText}
          </a>
        </div>
        <div className="card-footer text-muted">{props.footer}</div>
      </div>

      <div className="mainContainer">
        <div className="nameCon">
          <h3>recipename</h3>
        </div>
        <div className="dataCon">
          <div className="chefName">Chef name</div>
          <div className="recipedetailsCon">view counts</div>
        </div>
        <div className="videoLink"> embedded link</div>
        <div className="ingredientsCon">
          Ingredients
          <div className="ingredientsList">List of ingredients</div>
        </div>
        <div className="specialnotesCon">
          Special Notes
          <div className="specialnotes">Notes</div>
        </div>
        <div className="recipestepsCon">
          Recipe steps
          <div className="recipesteps">steps</div>
        </div>
        <div className="reciperatingCon">
          rating <br />
          <div>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type=" radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRating(ratingValue)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    width="24px"
                    height="24px"
                  >
                    <path d="M12 1.657l3.09 6.285 6.91.999-4.996 4.87 1.183 6.887L12 18.661l-6.187 3.227 1.183-6.887L2 8.941l6.91-.999L12 1.657z" />
                  </svg>
                </label>
              );
            })}
            <p>{rating}</p>
          </div>
        </div>
        <div className="feedbackCon">
          feedback
          <div className="feedbacks">
            fb1 <br /> fb2 <br /> fb3
          </div>
          <div className="feedbackInput">enter ur feedback</div>
        </div>
      </div>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}

