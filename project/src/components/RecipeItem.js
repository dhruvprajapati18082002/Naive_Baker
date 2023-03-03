import React from 'react'

export default function RecipeItem(props) {
    return (
        <div className=" card">
            <div className="card text-center">
                <div className="card-header ">
                    Daily Specials
                </div>
                <div className="card-body">
                    <h5 className="card-title">Recipe Title</h5>
                    <p className="card-text">This is how you make the item step by step for an awesome experience.</p>
                    <a href="#" className="btn btn-sm btn-primary">see recipe in detail</a>
                </div>
            <div className="card-footer text-muted">
                Note the recipe shown here is selected at random
            </div>
            </div>
        </div>
    )
}
