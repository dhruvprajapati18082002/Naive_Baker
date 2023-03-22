import React, { useState } from 'react';
import './styles.css';
import SignupPage from './signup';

function LoginPage(prop) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleEmailChange(event) {
      setEmail(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      // Add code to handle login/signup logic here
    }
    if(prop.page){
    //   console.log("page: " + page);
    return (
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>Login/Signup</h2>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit" className="submit-btn">Submit</button>
          <p className="signup-link">Don't have an account? <a href=""><button onClick  = {prop.toggleBool} >Sign up</button></a></p>
        </form>
      </div>
    );
    } else {
    //   console.log("page: " + page);
    }
  }
  
export default LoginPage;
