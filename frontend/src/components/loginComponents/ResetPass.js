import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import alertContext  from "../../context/alert/alertContext";
import spinnerContext from "../../context/spinner/spinnerContext";
import userContext from '../../context/user/userContext';

const ResetPass = () => {

    const navigate = useNavigate();
    const { showAlert } = useContext(alertContext);
    const { changePassword } = useContext(userContext);
    const { setLoading } = useContext(spinnerContext);
    const [cred, setCred] = useState({currentPassword: "", newPassword: "", confirmNewPassword: ""});

    useEffect(() => {
        setLoading(true);
        if (! localStorage.getItem('token'))
        {
            navigate("/login");
            showAlert("Please Login First or try Forgot Password!", "warning");
        }
        setLoading(false);
    }, []);

    const onChangeHandler = async (event) => {
        setCred({...cred, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        var pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
          );
        if(!pattern.test(cred.newPassword)){
            showAlert("Please enter the password with uppercase,lowercase,numeric and special character", "warning");
            return;
        }
        if (cred.newPassword !== cred.confirmNewPassword)
            showAlert("Passwords don't match","danger");
        else{
            const response = await changePassword(cred.currentPassword, cred.newPassword);
            if (response.user !== undefined){
                showAlert("Password Changed successfully", "success");
                navigate("/dashboard");
            }
            else{
                showAlert(response.errors.join("\n"), "danger");
            }
        }
        
        setLoading(false);
    }

  return (
    <section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-8 col-xl-6">
                    <div className="card rounded-3">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Reset Password</h3>

                        <form className="px-md-2" onSubmit={handleSubmit}>
                            
                            {/* Input field for old password */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">Enter current password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="currentPassword"
                                    name="currentPassword"
                                    onChange={onChangeHandler}
                                    placeholder="Enter current Password..."
                                    required
                                    autoComplete='on'
                                    minLength={5} maxLength={20}
                                />
                            </div>
                            
                            {/* Input field for new password */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">Enter new password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    onChange={onChangeHandler}
                                    placeholder="Enter New Password..."
                                    required
                                    autoComplete='on'
                                    minLength={5} maxLength={20}
                                />
                            </div>

                            {/* Input field for confirming new Password */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">Confirm new password*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    onChange={onChangeHandler}
                                    placeholder="Confirm New Password..."
                                    required
                                    autoComplete='on'
                                    minLength={5} maxLength={20}
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>

                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
  )
}

export default ResetPass
