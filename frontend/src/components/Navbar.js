import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

export default function Navbar() {

    const navigate = useNavigate(); 
    const { showAlert } = useContext(alertContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        showAlert('Logged Out Succesfully', "success");
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    {/* Loading the website name and logo in the navigation bar */}
                    <a className="navbar-brand" href="/">
                        <img src="logo.png" alt="Logo" width="50" height="50" className="d-inline block mx-1"/>
                        <div className="fs-6">NaiveBaker</div>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link" to="/Search">Search</Link>
                            <Link className="nav-link" to="/about-us">About Us</Link>
                        </div>

                        {
                            localStorage.getItem('token') ?
                            <div>
                                <button onClick={handleLogout} className="btn btn-outline-primary mx-3">Logout</button>
                            </div>
                            :
                            <div>
                                <Link className="btn btn-outline-primary mx-3" to="/login" role="button">Login</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
