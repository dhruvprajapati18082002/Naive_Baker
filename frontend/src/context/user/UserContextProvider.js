import { useState } from "react";
import axios from "axios";
import userContext from "./userContext";

const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

const UserContextProvider = (props) => {
    const [user, setUser] = useState({});

    // fetch logged in user's profile
    const getProfile = async () => {

        const response = await axios.get(
            `${BACKEND}/api/auth/getProfile`, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            }).catch(error => {
                return error.response;
            });
        if (response.data.user !== undefined)
            setUser(response.data.user)
    };

    const changePassword = async (oldPassword, newPassword) => {
        const response = await axios.put(
            `${BACKEND}/api/auth/changepassword`, {
                oldPassword: oldPassword,
                newPassword: newPassword
            },{
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            }
        ).catch(error=> {
            return error.response;
        })
        return response.data;
    }

    const getOTP = async (email) => {
        const response = await axios.post(
            `${BACKEND}/api/auth/forgotpassword`,{
                email: email
            }
        ).catch(error => {
            return error.response;
        })
        return response.data;
    }

    const verifyOTP = async (otp, password) => {
        const response = await axios.post(
            `${BACKEND}/api/auth/resetpassword?token=${otp}`, {
                password: password
            }
        ).catch(error => {
            return error.response;
        })
        return response.data;
    }

    return (
        <userContext.Provider value={{ user, getProfile, changePassword, getOTP, verifyOTP }}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserContextProvider