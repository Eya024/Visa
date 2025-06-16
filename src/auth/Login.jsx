// src/auth/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth/login.css';
import logo from '../assets/images/logo.png';
import { checkLoggedIn } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch('http://localhost:8000/api/auth/login/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setErrors({ form: errorData.error || 'Login failed' });
          return;
        }

        const data = await res.json();

        // Save user ID to localStorage
        localStorage.setItem('userID', data.id); // or data.user.id if nested

        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/studentDashboard');
        }
      } catch (err) {
        console.error('Login error:', err);
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    }
  };

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const userData = await checkLoggedIn();
      if (userData) {
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/studentDashboard');
        }
      }
    };
    redirectIfLoggedIn();
  }, [navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <Link to="/home">
          <img src={logo} alt="MatDash Logo" className="login-logo" style={{ cursor: 'pointer' }} />
        </Link>
        <h2 className="login-title">Sign In on MatDash</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember this Device
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password ?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={!username.trim() || !password}>
            Sign in
          </button>
        </form>
        <p className="signup-text">
          New to Matdash? <Link to="/inscription">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;