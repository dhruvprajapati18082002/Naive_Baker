import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div>
            <div className="bg-dark text-light" style={{opacity:"0.6"}}>
                {/* <div className="card-body"> */}
                    <p className="card-text text-center my-2">
                        &#169; 2023 Naive Baker | All rights Reserved. <br/>
                        To know more about us, <Link to="/about-us" style={{color:"inherit"}}>click here</Link>.
                    </p>
                {/* </div> */}
            </div>
        </div>
    );
}
