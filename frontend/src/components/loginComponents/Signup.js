import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = (props) => {
    
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmPassword: ""});

    const onChangeHandler = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (credentials.password !== credentials.confirmPassword)
        {
            alert("Password and Confirm Password Must Match");
            return;
        }

        axios.post("http://localhost:5000/api/auth/createuser", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            hasPremium: false
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
        <div className={`tab-pane fade show ${props.active ? "active" : ""}`} id="register" role="tabpanel" aria-labelledby="tab-register">
            <form onSubmit={handleSubmit}>
                {/* Name input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={credentials.name}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email*</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        className="form-control" 
                        value={credentials.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChangeHandler}
                        required
                        autoComplete='on'
                    />
                </div>

                {/* Repeat Password input */}
                <div className="+form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">Repeat password*</label>
                    <input 
                        type="password"
                        id="confirmPassword" 
                        name="confirmPassword" 
                        className="form-control"
                        value={credentials.confirmPassword}
                        onChange={onChangeHandler}
                        required
                        autoComplete='on'
                    />
                </div>

                {/* Checkbox */}
                <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                    aria-describedby="registerCheckHelpText" required/>
                    <label className="form-check-label" htmlFor="registerCheck">
                        I agree to the conditions applied.
                    </label>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-dark" style={{width: "100%"}}>Register</button>
            </form>
        </div>
    );
}

export default SignUp;