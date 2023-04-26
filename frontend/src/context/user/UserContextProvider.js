import { useState } from "react";
import axios from "axios";
import userContext from "./userContext";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const UserContextProvider = (props) => {
    const [user, setUser] = useState({});

    // fetch logged in user's profile
    const getProfile = async () => {

        const res = await axios.get(
            `${BACKEND}/api/auth/getProfile`, {
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