import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = (props) => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({loginEmail: "", loginPassword: ""});

    const onChangeHandler = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post("http://localhost:5000/api/auth/login", {
            email: credentials.loginEmail,
            password: credentials.loginPassword
        })
        .then(response => {
            if (response.status === 200){
                localStorage.setItem('token', response.data.authToken);
                navigate('/');
            }
            else
                alert(response.data)
        })
        .catch(error => {
            alert("Invalid Credentials");
        });
    }

    return (
        <div className={`tab-pane fade show ${props.active ? "active" : ""}`} 
        id="login" role="tabpanel" aria-labelledby="tab-login"
        >
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginEmail">Email</label>
                    <input type="email" id="loginEmail" name="loginEmail" className="form-control" value={credentials.email} onChange={onChangeHandler} required />
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input 
                        type="password" 
                        id="loginPassword" 
                        name="loginPassword" 
                        className="form-control" 
                        value={credentials.password} 
                        onChange={onChangeHandler} 
                        required 
                        autoComplete='on'
                    />
                </div>

                {/* 2 column grid layout */}
                <div className="row mb-4 text-center">
                        {/* Simple link */}
                        <Link to="#forgot-password">Forgot password?</Link>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-dark" style={{width: "100%"}}>Sign in</button>
            </form>
        </div>
    )
}

export default Signin
