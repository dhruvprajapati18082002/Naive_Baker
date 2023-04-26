import React from 'react'
import { Link } from "react-router-dom"

export default function RecipeItem(props) {
    return (

        <div className="container mx-auto mt-4" style={{maxWidth:"fit-content"}}>

                <div className="card" style={{width: "18rem"}}>
                    <img src={props.image} className="card-img-top" alt="..." style={{height:"13rem"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text" style={{height: "2.5rem" }}>{props.text.length > 50 ? props.text.slice(47)+"..." : props.text}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{props.cuisinearea}</li>
                        <li className="list-group-item">{props.typearea}</li>
                        <li className="list-group-item">{props.duration} Min</li>
                    </ul>
                    <div className="card-body">
                        <center><Link to={props.recipeLink} className="btn btn-dark">See Recipe in Detail</Link></center>
                    </div>
                </div>

        </div>
    )
}