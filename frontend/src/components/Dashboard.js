import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfilePic from "./dashboardComponents/ProfilePic";
import Extras from "./dashboardComponents/Extras";
import UserDetails from "./dashboardComponents/UserDetails";

import userContext from "../context/user/userContext";
import alertContext from "../context/alert/alertContext";

const Profile = () => {
    const navigate = useNavigate();

    const { getProfile } = useContext(userContext);
    const { showAlert } = useContext(alertContext)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            showAlert("please login first", "warning");
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
