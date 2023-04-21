import { useState } from "react";
import axios from "axios";
import userContext from "./userContext";

const UserContextProvider = (props) => {
    const [user, setUser] = useState({});

    // fetch logged in user's profile
    const getProfile = async () => {

        const res = await axios.post(
            "http://localhost:5000/api/auth/getProfile", null, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });
        const json = res.data;
        setUser(json);
    };

    return (
        <userContext.Provider value={{ user, getProfile }}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserContextProvider