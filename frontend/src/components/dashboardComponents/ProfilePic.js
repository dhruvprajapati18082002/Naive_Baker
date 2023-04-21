import React, { useContext } from "react";
import userContext from "../../context/user/userContext";

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

                        <button className="btn btn-primary mx-1">Follow</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePic;
