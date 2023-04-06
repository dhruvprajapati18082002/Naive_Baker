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
        <div className="container my-3" style={{width: "18rem"}}>
            
            {/* Pills navs */}
            <ul className="nav nav-pills nav-justified mb-3" id="tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${isLogin ? "active" : ""}`} id="tab-login" data-mdb-toggle="pill" role="tab"
                        aria-controls="pills-login" aria-selected={`${isLogin}`} onClick={openLogin}>Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${isLogin ? "" : "active"}`} id="tab-register" data-mdb-toggle="pill" role="tab"
                    aria-controls="pills-register" aria-selected={`${!isLogin}`} onClick={openRegister}>Register</Link>
                </li>
            </ul>
            {/* Pills navs */}

            {/* Pills content */}
            <div className="tab-content">
                <SignIn isLogin={isLogin} openRegister={openRegister}/>
                <SignUp isLogin={isLogin} openLogin={openLogin}/>
            </div>
            {/* Pills content */}
        </div>
    )
}