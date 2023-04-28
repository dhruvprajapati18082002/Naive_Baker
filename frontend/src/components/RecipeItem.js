import React from 'react'
import { Link } from "react-router-dom"

export default function RecipeItem(props) {
    return (

        // <div className="container mx-auto mt-4" style={{maxWidth:"fit-content"}}>

                <div className="card my-3 mx-3 shadow-lg" style={{width: "16rem" ,backgroundColor:"#FDFEFB"}}>
                    <img src={props.image} className="card-img-top" alt="..." style={{height:"13rem"}}/>
                    <div className="card-body">
                        <h5 className="text-center card-title">{props.title}</h5>
                        <hr />
                        <div className="container-fluid d-flex justify-content-between">
                        <span className="badge bg-secondary">{props.duration} Min</span>
                        <span className="badge bg-secondary">{props.typearea}</span>
                        <span className="badge bg-secondary">{props.cuisinearea}</span>
                        </div>
                        <hr />
                        <p className="card-text" style={{height: "2rem" }}>{props.text.length > 60 ? props.text.slice(0,57)+"..." : props.text}</p>
                    </div>

                    <div className="card-body">
                        <center><Link to={props.recipeLink} className="btn btn-dark">See Recipe in Detail</Link></center>
                    </div>
                </div>

    //      </div>
    )
}