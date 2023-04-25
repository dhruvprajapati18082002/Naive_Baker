import React, { useContext } from "react";
import userContext from "../../context/user/userContext";

import { Link } from "react-router-dom";

const ProfilePic = () => {

    const { user } = useContext(userContext);

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <ul className="list-group list-group-horizontal flex-fill">
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                
                                <Link className="btn btn-success my-1" to="/uploadrecipe">Upload Recipe</Link>
                                
                            </li>
                            
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <button type="button" className="btn btn-success my-1" disabled={user.hasPremium}>
                                    Upgrade To Premium
                                </button>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <Link className="btn btn-success my-1" to="/resetpass">Reset Password </Link>
                            </li>
                        </ul>
                        {/* <button className="btn btn-primary mx-1">Follow</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePic;
