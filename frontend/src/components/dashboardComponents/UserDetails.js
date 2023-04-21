import React, { useContext } from "react";
import userContext from "../../context/user/userContext";

const UserDetails = () => {

    const { user } = useContext(userContext);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user.name}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user.email}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">User-Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user.username}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">User Type</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.hasPremium ? "Premium User" : "Regular User"}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Total Recipes Owned</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user.recipesOwned ? user.recipesOwned.length : 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
