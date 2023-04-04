import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p className="text-justify"><b><h9>NAIVE BAKER</h9></b> is an platorm to make cooking easy and joyful. This attracts the newbies to the webiste and experience cooking. The platform provides various filters to list our recipes based on the user demand. The platfrom is a free to use platform. </p>
                        <p className="text-justify">We are proud to announce that we are planning to extend this services on mobile apps. </p>
                        <p className="text-justify"><h8>ENJOY COOKING</h8> </p>
                    </div>
            
                    <div className="col-xs-6 col-md-2">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/">Search</Link></li>
                        <li><Link to="/about-us">About us</Link></li>
                        </ul>
                    </div>
                </div>
                <hr></hr>
            </div>

            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-0 col-sm-6 col-xs-12" >
                        <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by  
                            <Link to="#"> NaiveBaker</Link>.
                        </p>
                    </div>
        
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li><Link className="facebook" to="#"><i className="fa fa-facebook"></i></Link></li>
                            <li><Link className="twitter" to="#"><i className="fa fa-twitter"></i></Link></li>
                            <li><Link className="dribbble" to="#"><i className="fa fa-dribbble"></i></Link></li>
                            <li><Link className="linkedin" to="#"><i className="fa fa-linkedin"></i></Link></li>   
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
