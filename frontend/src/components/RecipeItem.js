import React from 'react'

export default function RecipeItem(props) {
    return (
        <div className=" card">
            <div className="card text-center">
                <div className="card-header ">
                    {props.header}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.text}</p>
                    <a href="#" className="btn btn-sm btn-primary">{props.btnText}</a>
                </div>
            <div className="card-footer text-muted">
                {props.footer}
            </div>
            </div>
        </div>
    )
}
