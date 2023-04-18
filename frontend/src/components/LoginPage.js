import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignIn from './loginComponents/Signin';
import SignUp from './loginComponents/Signup';

export default function LoginPage() {

    const [isLogin, setIsLogin] = useState(true);
    const openLogin = () =>{
        setIsLogin(true);
    }
    const openRegister = () =>{
        setIsLogin(false);
    }

    return (
        <div className="container shadow-lg my-3 bg-body-tertiary rounded" style={{width: "fit-content"}}>
            
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
                style={{height: "32rem", width: "28rem"}}>
                <SignIn active={isLogin} linkToRegister={openRegister}/>
                <SignUp active={!isLogin} linkToLogin={openLogin}/>
            </div>
            {/* Tab content end*/}
        </div>
    )
}