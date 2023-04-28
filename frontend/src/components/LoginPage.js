import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import SignIn from './loginComponents/Signin';
import SignUp from './loginComponents/Signup';
import { useNavigate } from 'react-router-dom';

import alertContext from '../context/alert/alertContext';
import spinnerContext from "../context/spinner/spinnerContext";

export default function LoginPage() {

    const [isLogin, setIsLogin] = useState(true);
    const { showAlert } = useContext(alertContext);
    const { setLoading } = useContext(spinnerContext);

    const navigate = useNavigate();
    const openLogin = () =>{
        setIsLogin(true);
    }
    const openRegister = () =>{
        setIsLogin(false);
    }

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
            showAlert("You are already logged-in !", "warning");
        }
        setLoading(false);
    }, []);

    return (
        <div className="container shadow-lg my-3 bg-body-tertiary rounded" style={{minWidth: "fit-content", maxWidth: "400px"}}>
            
            {/* Tab navs start*/}
            <ul className="nav nav-tabs nav-justified mb-3" id="tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${isLogin ? "active" : ""}`} id="tab-login" data-mdb-toggle="tab" role="tab"
                        aria-controls="pills-login" aria-selected={`${isLogin}`} onClick={openLogin}>Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${isLogin ? "" : "active"}`} id="tab-register" data-mdb-toggle="tab" role="tab"
                    aria-controls="pills-register" aria-selected={`${!isLogin}`} onClick={openRegister}>Register</Link>
                </li>
            </ul>
            {/* Tab navs end*/}

            {/* Tab content start*/}
            <div className="tab-content d-flex justify-content-center align-items-center" 
                style={{height: "37rem"}}>
                <SignIn active={isLogin} linkToRegister={openRegister}/>
                <SignUp active={!isLogin} linkToLogin={openLogin}/>
            </div>
            {/* Tab content end*/}
        </div>
    )
}