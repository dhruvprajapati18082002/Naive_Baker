import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
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
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            <Link className="nav-link" to="/">Search</Link>
                            <Link className="nav-link" to="/about-us">About Us</Link>
                            <Link className="nav-link" to="/login">Sign-in/Sign-up</Link>
                        </div>

                        <div className={`form-check form-switch mx-3 text-${props.mode==='dark'?'light':'dark'}`}>
                            <input className="form-check-input" type="checkbox" onClick={props.toggleMode} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
