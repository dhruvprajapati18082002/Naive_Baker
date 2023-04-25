import React, { useContext } from "react";
import userContext from "../../context/user/userContext";

import { Link } from "react-router-dom";

const Extras = () => {

    const { user } = useContext(userContext);

    return (
        <div className="card mt-3">
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    
                    <Link className="btn btn-dark my-1" to="/uploadrecipe">Upload Recipe</Link>
                    
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <button type="button" className="btn btn-dark my-1">
                        View your Recipes
                    </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <button type="button" className="btn btn-dark my-1" disabled={user.hasPremium}>
                        Upgrade To Premium
                    </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <Link className="btn btn-dark my-1" to="/resetpass">Reset Password </Link>
                </li>
            </ul>
        </div>
    );
};

export default Extras;
