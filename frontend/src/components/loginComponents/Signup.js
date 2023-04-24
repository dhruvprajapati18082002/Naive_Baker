import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import alertContext from '../../context/alert/alertContext';

const SignUp = (props) => {
    
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", username: "", email: "", password: "", confirmPassword: ""});
    const { showAlert } = useContext(alertContext);

    const onChangeHandler = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (credentials.password !== credentials.confirmPassword)
        {
            showAlert("Password and Confirm Password Must Match", "warning");
            return;
        }

        axios.post("http://localhost:5000/api/auth/createuser", {
            name: credentials.name,
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            hasPremium: false
        })
        .then(response => {
            if (response.status === 201){
                localStorage.setItem('token', response.data.authToken);
                navigate('/');
            }
            else
                showAlert(response.data, "warning");
        })
        .catch(error => {
            showAlert(error.message, "danger");
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

                {/* username input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">username*</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={credentials.username}
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