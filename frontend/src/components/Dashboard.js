import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";

import ProfilePic from "./dashboardComponents/ProfilePic";
import Extras from "./dashboardComponents/Extras";
import UserDetails from "./dashboardComponents/UserDetails";

const Profile = () => {
    const navigate = useNavigate();
    const context = useContext(userContext);
    const { user, getProfile } = context;

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            alert("please login first");
        } else {
            getProfile();
        }
    }, []);

    return (
        <div className="container my-3">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <ProfilePic />
                        <Extras />
                    </div>

                    <div className="col-md-8">
                        <UserDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
