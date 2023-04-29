import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import alertContext from "../../context/alert/alertContext";
import userContext from "../../context/user/userContext";
import spinnerContext from "../../context/spinner/spinnerContext";

const forgotpass = () => {

    const navigate = useNavigate();
    const { showAlert } = useContext(alertContext);
    const { getOTP, verifyOTP } = useContext(userContext);
    const { setLoading } = useContext(spinnerContext);

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('token')){
            showAlert("You are already Logged-in! Try Reset Password Instead !", "warning");
            navigate("/resetpass");
        }
        setLoading(false);
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setLoading(true);
        const otp = document.getElementById('otp').value;
        const password = document.getElementById("password").value;

        const response = await verifyOTP(otp, password);
        setLoading(false);
        if (response.message !== undefined){
            showAlert(response.message, "success");
            navigate("/login");
        }
        else
            showAlert(response.errors.join("\n"), "danger");
    }

    const getOTPHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await getOTP(document.getElementById("email").value);

        setLoading(false);
        if (response.message !== undefined)
            showAlert(response.message, "success");
        else
            showAlert(response.errors.join("\n"), "danger");
    }

    return (
        <section
            className="h-100 h-custom"
            style={{ backgroundColor: "#8fc4b7" }}
        >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                                    Forgot Password?
                                </h3>

                                <form className="px-md-2" onSubmit={getOTPHandler}>
                                    {/* this is for email input */}
                                    <div className="form-control my-4">
                                        <label className="from-control-text" htmlFor="email">
                                            Registered Email*
                                        </label>
                                        <input type="email" 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="enter your email..." 
                                            required
                                            minLength={5} maxLength={100} />
                                    </div>

                                    <button type="submit" className="btn btn-success btn mb-1" >
                                        Get OTP
                                    </button>
                                
                                </form>

                                <form className="px-md-2" onSubmit={handleSubmit}>
                                    {/* Enter OTP */}
                                    <div className="form-control my-4">
                                        <label className="form-control-text" htmlFor="otp">
                                            OTP*
                                        </label>
                                        <input type="number" 
                                            className="form-control" 
                                            id="otp" 
                                            placeholder="enter OTP..." 
                                            required
                                            min="100000"
                                            max="999999"
                                        />
                                    </div>

                                    {/* Enter new Password */}
                                    <div className="form-control my-4">
                                        <label className="form-control-text" htmlFor="password">
                                            New Password*
                                        </label>
                                        <input type="password" 
                                            className="form-control" 
                                            id="password"
                                            placeholder="enter new password..." 
                                            required
                                            minLength={5} maxLength={20} />
                                    </div>

                                    <button type="submit" className="btn btn-success btn-lg mb-1" >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default forgotpass;
