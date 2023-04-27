import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfilePic from "./dashboardComponents/ProfilePic";

import UserDetails from "./dashboardComponents/UserDetails";
import UserRecipes from "./dashboardComponents/UserRecipes";

import userContext from "../context/user/userContext";
import alertContext from "../context/alert/alertContext";

const Profile = () => {
  const navigate = useNavigate();

  const { getProfile } = useContext(userContext);
  const { showAlert } = useContext(alertContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      showAlert("please login first", "warning");
    } else {
      getProfile();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100 ">
        <div className="col gutters-sm">
          <div className="row-col-sm-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{backgroundColor:"#FDFEFB"}}>
            <ProfilePic />
            <UserDetails />
          </div>

          <div className="d-flex flex-wrap justify-content-around">
            <UserRecipes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
