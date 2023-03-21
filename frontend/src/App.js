import React, { useState } from 'react';
import './styles.css';
import SignupPage from './signup';
import LoginPage from './login';


function App() {
  const [myBool, setmyBool] = useState(true);

  function toggleBool() {
    setmyBool(!myBool)
  }

  return (
    <SignupPage />
    // myBool ? <LoginPage toggleBool={toggleBool} /> : <SignupPage/> 
  );
}

export default App;