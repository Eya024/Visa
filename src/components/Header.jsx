// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/images/logo.png';


const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo on the left */}
        <div className="logo-container">
          <Link to="/">
          <img src={logo} alt="Visa Agency Logo" className="logo" />

          </Link>
        </div>

        {/* Navigation centered */}
        <nav className={`nav-menu ${scrolled ? 'nav-scrolled' : ''}`}>
          <ul className="nav-list">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/admission", label: "Admission" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to} className="nav-item">
                <Link to={item.to} className="nav-link">
                  {item.label}
                  <span className="nav-link-underline"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;