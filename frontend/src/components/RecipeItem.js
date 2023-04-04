import React from 'react'
import { Link } from "react-router-dom"

export default function RecipeItem(props) {
    return (

        <div className="container mx-auto mt-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={props.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                    <p className="card-text">{props.text}</p>
                    <Link to={props.recipeLink} className="btn btn-dark">See Recipe in Detail</Link>
                </div>
            </div>
        </div>
    )
}
