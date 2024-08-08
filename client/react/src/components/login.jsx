import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loginMessage) {
      timer = setTimeout(() => {
        setLoginMessage('');
      }, 3000); 
    }
    return () => clearTimeout(timer); 
  }, [loginMessage]);

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    try {
      if (password.length < 6) {
        setLoginMessage("Password should be more than 5 characters");
        setIsLoading(false); // End loading
        return;
      }

      const response = await axios.post(`https://five5-raj-capstone-healthcare-4.onrender.com/login`, { username, password });
      if (response.status === 200) {
        setCookie('username', username, 365);
        setCookie('password', password, 365);
        sessionStorage.setItem('loginSuccess', 'Login successful');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('login', true);
        navigate("/patient");
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <br></br>

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {loginMessage && <div className="error-message">{loginMessage}</div>}
        <br></br>

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
}

export default Login;
