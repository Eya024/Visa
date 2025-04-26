import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;