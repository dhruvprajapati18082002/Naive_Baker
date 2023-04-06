import React from 'react'
import { Link } from "react-router-dom"

const SignUp = (props) => {
  return (
      <div className={`tab-pane fade show ${props.isLogin ? "" : "active"}`} id="register" role="tabpanel" aria-labelledby="tab-register">
        <form>
            <div className="text-center mb-3">
                <p>Sign up with:</p>
            </div>

            {/* Name input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerName">Name</label>
                <input type="text" id="registerName" className="form-control" />
            </div>

            {/* Email input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerEmail">Email</label>
                <input type="email" id="registerEmail" className="form-control" />
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerPassword">Password</label>
                <input type="password" id="registerPassword" className="form-control" />
            </div>

            {/* Repeat Password input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                <input type="password" id="registerRepeatPassword" className="form-control" />
            </div>

            {/* Checkbox */}
            <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                aria-describedby="registerCheckHelpText" />
                <label className="form-check-label" htmlFor="registerCheck">
                    I have read and agree to the terms
                </label>
            </div>

            {/* Submit button */}
            <div className="text-center">
                <button type="submit" className="btn btn-dark" style={{width: "100%"}}>Register</button>
            </div>

            {/* Login buttons */}
            <div className="text-center my-3">
                <p>Already a member? <Link onClick={props.openLogin}>Login</Link></p>
            </div>
        </form>
    </div>
  );
}

export default SignUp;