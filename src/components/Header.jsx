import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import '../styles/header.css';
import logo from '../assets/images/logo.png';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state
  const navigate = useNavigate(); // Initialize navigate


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
  
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/me/', {
          method: 'GET',
          credentials: 'include',
        });
    
        // Log the response to inspect
        const text = await response.text();
        console.log(text);
    
        const data = JSON.parse(text); // Try parsing the text manually
    
        if (data && data.username) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };
    
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    checkLoginStatus();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch('http://localhost:8000/api/auth/logout/', {
          method: 'POST',
          credentials: 'include', // Important to include session cookies
          headers: {
            'X-CSRFToken': getCookie('csrftoken') // if using CSRF
          }
        });
  
        if (response.ok) {
          localStorage.setItem('isLoggedIn', 'false'); // Make sure to update this
          localStorage.removeItem('userID');  // <--- remove userID here
          localStorage.removeItem('userId'); // Try lowercase version too

          console.log('After logout - localStorage:', localStorage); // Add this


          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };
  


  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/admission", label: "Admission" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Visa Agency Logo" className="logo" />
          </Link>
        </div>

        {/* Navigation - centered on desktop, hamburger menu on mobile */}
        {!isMobile ? (
          <>
            <nav className={`nav-menu ${scrolled ? 'nav-scrolled' : ''}`}>
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.to} className="nav-item">
                    <Link to={item.to} className="nav-link">
                      {item.label}
                      <span className="nav-link-underline"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Updated Auth section */}
            <div className="auth-container">
              {isLoggedIn ? (
                <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleAuthClick();
                }}
                className={`auth-button ${scrolled ? 'scrolled' : ''}`}
              >
                Logout
                <span className="nav-link-underline"></span>
              </Link>
              
              ) : (
                <Link
                  to="/login"
                  className={`auth-button ${scrolled ? 'scrolled' : ''}`}
                >
                  Login
                  <span className="nav-link-underline"></span>
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Mobile menu overlay */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
              <ul className="mobile-nav-list">
                {navItems.map((item) => (
                  <li key={item.to} className="mobile-nav-item">
                    <Link
                      to={item.to}
                      className="mobile-nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mobile-nav-item">
                  {isLoggedIn ? (
                    <button
                      className="mobile-nav-link"
                      onClick={() => {
                        handleAuthClick();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="mobile-nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;