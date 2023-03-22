import React, { useState } from 'react';
import './styles.css';
import LoginPage from './login';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Add code to handle signup logic here
  }
  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-input"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button type="submit" className="submit-btn">Sign Up</button>
        <p className="signup-link">Already have an account? <a href="#">Log in</a></p>
      </form>
    </div>
  ); 
}   

export default SignupPage;
