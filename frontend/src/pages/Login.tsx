/**
 * This file is a component for handling user authentication, including rendering the login form and submitting credentials to the API.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Login.css';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  
  return (
  
    <div className="login-container">
      <div className="login-box">

        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>
              {/* Navigation Links inside the login box */}
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/tasks">Tasks</Link>
        </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;