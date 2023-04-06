import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer className="py-3 bg-dark text-light">
            <div className="container">
                {/* naivebaker and quicklinks */}
                <div className="row justify-content-between">
                    <div className="col-6">
                        <h6>ABOUT</h6>                    
                        <p className="text-justify text-secondary">
                            <b>NAIVE BAKER</b> is an platorm to make cooking easy and joyful. This attracts the newbies to the webiste and experience cooking. 
                            The platform provides various filters to list our recipes based on the user demand. The platfrom is a free to use platform. 
                            We are proud to announce that we are planning to extend this services on mobile apps.
                        </p>
                        <p className="text-justify text-secondary">ENJOY COOKING</p>
                    </div>

                    <div className="col-md-5" style={{width: "fit-content"}}>
                        <h6>QUICK LINKS</h6>
                        <ul className="list-unstyled">
                            <li><Link className="nav-link text-secondary" to="/">Home</Link></li>
                            <li><Link className="nav-link text-secondary" to="/dashboard">Dashboard</Link></li>
                            <li><Link className="nav-link text-secondary" to="/Search">Search</Link></li>
                            <li><Link className="nav-link text-secondary" to="/about-us">About Us</Link></li>
                            <li><Link className="nav-link text-secondary" to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>

                {/* copyright and social-media-links */}
                <div className="d-flex flex-column flex-sm-row justify-content-between py-2 border-top">
                    <p>
                        Copyright &copy; 2023 All Rights Reserved By NaiveBaker.
                    </p>

                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><Link className="instagram" to="#">
                            <h6 className="mb-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg></h6>
                        </Link></li>
                        <li className="ms-3"><Link className="twitter" to="#">
                            <h6 className="mb-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg></h6>
                        </Link></li>
                        <li className="ms-3"><Link className="facebook" to="#">
                            <h6 className="mb-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg></h6>
                        </Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
