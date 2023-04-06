import React from 'react';
import { Link } from 'react-router-dom';

const Signin = (props) => {
  return (
    <div className={`tab-pane fade show ${props.isLogin ? "active" : ""}`} id="login" role="tabpanel" aria-labelledby="tab-login">
        <form>
            {/* Email input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="userEmail">Email</label>
                <input type="email" id="userEmail" name="userEmail" className="form-control" required />
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" name="loginPassword" className="form-control" required />
            </div>

            {/* 2 column grid layout */}
            <div className="row mb-4 text-center">
                    {/* Simple link */}
                    <Link to="#forgot-password">Forgot password?</Link>
            </div>

            {/* Submit button */}
            <div className="text-center">
                <button type="submit" className="btn btn-dark" style={{width: "100%"}}>Sign in</button>
            </div>

            {/* Register buttons */}
            <div className="text-center my-3">
                <p>Not a member? <Link onClick={props.openRegister}>Register</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Signin
