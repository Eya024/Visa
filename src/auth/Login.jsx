import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth/login.css';
import logo from '../assets/images/logo.png';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Authentication logic here
            navigate('/studentDashboard');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <img src={logo} alt="MatDash Logo" className="login-logo" />
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
                        <Link to="/forgot-password" className="forgot-link">Forgot Password ?</Link>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={!username.trim() || !password}
                    >
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
