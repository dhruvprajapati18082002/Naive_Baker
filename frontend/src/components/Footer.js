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
                        <li><Link to="/search">Search</Link></li>
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
                            <li><Link className="facebook" to="#"><h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></h6>
</Link></li>
                            <li><Link className="twitter" to="#"><h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></h6>
</Link></li>
                            <li><Link className="dribbble" to="#"><h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></h6>
</Link></li>
                            <li><Link className="linkedin" to="#"><h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></h6>
</Link></li>   
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
