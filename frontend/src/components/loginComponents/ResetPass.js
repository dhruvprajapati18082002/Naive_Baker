import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import alertContext  from "../../context/alert/alertContext";
import userContext from '../../context/user/userContext';

const ResetPass = () => {

    const navigate = useNavigate();
    const { showAlert } = useContext(alertContext);
    const { changePassword } = useContext(userContext);
    const [cred, setCred] = useState({currentPassword: "", newPassword: "", confirmNewPassword: ""});

    useEffect(() => {
        if (! localStorage.getItem('token'))
        {
            navigate("/login");
            showAlert("Please Login First !", "warning");
        }
    }, []);

    const onChangeHandler = async (event) => {
        setCred({...cred, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (cred.newPassword !== cred.confirmNewPassword)
            showAlert()
        const response = await changePassword(cred.currentPassword, cred.newPassword);
        if (response.status === 200)
            showAlert("Password Successfully Changed", "success");
        else{
            showAlert(JSON.stringify(response.data), "danger");git
        }
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
