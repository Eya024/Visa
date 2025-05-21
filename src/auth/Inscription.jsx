import React, { useState, useEffect, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth/login.css';
import logo from '../assets/images/logo.png';
import { checkLoggedIn } from '../utils/auth';


const Inscription = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const [touched, setTouched] = useState({});

    const validate = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must be 8+ characters, include a number and uppercase letter';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    }, [formData]);



    useEffect(() => {
        const validationErrors = validate();
        setErrors(validationErrors);
        const filledOut = Object.values(formData).every(val => val.trim() !== '');
        setIsFormValid(filledOut && Object.keys(validationErrors).length === 0);
    }, [formData, validate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));
    };


    useEffect(() => {
        const redirectIfLoggedIn = async () => {
            const isLoggedIn = await checkLoggedIn();
            if (isLoggedIn) {
                navigate('/studentDashboard');
            }
        };
        redirectIfLoggedIn();
    }, [navigate]);





    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Important if you're using session-based auth
                body: JSON.stringify({
                    username: formData.name, // This maps to `username` in Django
                    email: formData.email,
                    password: formData.password,
                    role: 'student' // or 'admin' or 'advisor' depending on your use case
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered:', data);

                // Save the registration response data to localStorage
                localStorage.setItem('userID', data.id);
                localStorage.setItem('userMessage', data.message);
                localStorage.setItem('userName', formData.name);
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('userPhone', formData.phone);

                // Optionally, you can check the localStorage directly in the console:
                console.log(localStorage.getItem('userID'));  // Should log the ID value
                console.log(localStorage.getItem('userMessage'));  // Should log the message
                console.log(localStorage.getItem('userName'));  // Should log the user's name
                console.log(localStorage.getItem('userEmail'));  // Should log the user's email
                console.log(localStorage.getItem('userPhone'));  // Should log the user's phone number

                // After saving to localStorage, navigate to the dashboard
                navigate('/studentDashboard');
            } else {
                const errorText = await response.text();
                setErrors({ api: errorText });
                console.error('Registration failed:', errorText);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrors({ api: 'Network or server error' });
        }
    };






    return (
        <div className="login-wrapper">
            <div className="login-card">
                <Link to="/home">
                    <img src={logo} alt="MatDash Logo" className="login-logo" style={{ cursor: 'pointer' }} />
                </Link>
                <h2 className="login-title">Create an Account</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={touched.name && errors.name ? 'input-error' : ''}
                    />
                    {touched.name && errors.name && <span className="error-text">{errors.name}</span>}

                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={touched.email && errors.email ? 'input-error' : ''}
                    />
                    {touched.email && errors.email && <span className="error-text">{errors.email}</span>}

                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={touched.phone && errors.phone ? 'input-error' : ''}
                    />
                    {touched.phone && errors.phone && <span className="error-text">{errors.phone}</span>}

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={touched.password && errors.password ? 'input-error' : ''}
                    />
                    {touched.password && errors.password && <span className="error-text">{errors.password}</span>}

                    <label>Repeat Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
                    />
                    {touched.confirmPassword && errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

                    <button type="submit" className="login-btn" disabled={!isFormValid}>
                        Sign Up
                    </button>
                </form>
                <p className="signup-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Inscription;
