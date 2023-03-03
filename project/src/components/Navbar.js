import React from "react";

export default function Navbar(props) {
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid">
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
                            <a className="nav-link active" href="/">Home</a>
                            <a className="nav-link" href="/">Dashboard</a>
                            <a className="nav-link" href="/">Search</a>
                            <a className="nav-link" href="/">About Us</a>
                            <a className="nav-link" href="/">Sign-in/Sign-up</a>
                        </div>

                        <div className={`form-check form-switch mx-3 text-${props.mode==='light'?'dark':'light'}`}>
                            <input className="form-check-input" type="checkbox" onClick={props.toggleMode} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
