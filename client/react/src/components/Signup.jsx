import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setSignupError("Password should be more than 5 characters");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Sending signup request...");
      const response = await axios.post(`https://five5-raj-capstone-healthcare-4.onrender.com/signup`, { username, password });
      console.log("Response received:", response);

      if (response.status === 201) {
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('signupSuccess', 'Signup successful');
        sessionStorage.setItem('username', username);
        console.log("Navigating to /patient...");
        navigate("/patient");
      } else {
        setSignupError('Signup failed');
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setSignupError('An error occurred during the signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formpage">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <br />
          {signupError && <p className="error">{signupError}</p>}

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'SIGNUP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
