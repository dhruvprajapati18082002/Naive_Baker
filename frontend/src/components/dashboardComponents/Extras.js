import React, { useContext } from "react";
import userContext from "../../context/user/userContext";

const Extras = () => {

    const { user } = useContext(userContext);

    return (
        <div className="card mt-3">
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <button type="button" className="btn btn-dark my-1">
                        Upload Recipe
                    </button>
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
                    <button type="button" className="btn btn-dark my-1">
                        Clear Watch History
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Extras;
