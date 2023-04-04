import React from 'react'
import Search from './Search'
export default function RecipeItem(props) {
    return (
        <div className="empty">
            <div className="card-footer text-muted">
            <Search />
                {props.footer}
            </div>
        </div>

    )
}
