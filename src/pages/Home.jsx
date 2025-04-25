// Home.jsx
import React, { useEffect } from 'react';
import '../styles/home.css';
import homeVideo from '../assets/videos/home.mp4';
import { FaArrowRight } from 'react-icons/fa';
import aboutImage from '../assets/images/about-us.jpg'; // Add your image path here
import counselingImage from '../assets/images/counseling.jpg'; // Add your image paths
import universityImage from '../assets/images/university.jpg';
import supportImage from '../assets/images/support.jpg';
import { Link } from 'react-router-dom';


const Home = () => {
    useEffect(() => {
        document.body.classList.add('home-page');
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    return (
        <div className="home-container">
            {/* Video Background Section */}
            <div className="video-background">
                <video autoPlay loop muted playsInline className="video">
                    <source src={homeVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                    <div className="overlay-content">
                        <div className="tagline">EXPLORE. CONNECT. SUCCEED</div>
                        <h1 className="main-heading">A trusted and supportive pathway for international students</h1>
                        <p className="mission-statement">Our mission is to provide a safe and joyful journey for your academic pursuits.</p>
                        <button className="cta-button">
                            <span className="button-text">Contact us</span>
                            <span className="button-icon">
                                <FaArrowRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-image-container">
                        <img src={aboutImage || "/placeholder.svg"} alt="Students at Elegant Services" className="about-image" />
                    </div>
                    <div className="about-content">
                        <div className="about-subtitle">ABOUT US</div>
                        <h2 className="about-heading">We are here to help students achieve their academic dreams</h2>
                        <p className="about-text">
                            Elegant Services is a multinational agency committed to supporting students from the MENA region in achieving their educational goals abroad.
                        </p>
                        <p className="about-text">
                            Through strategic partnerships with leading academic institutions, the agency ensures a seamless admission process and provides personalized guidance to students.
                        </p>
                        <button className="about-button">
                            Know more about us
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="services-container">
                    <div className="services-header">
                        <div className="services-subtitle">OUR SERVICES</div>
                        <h2 className="services-heading">Stage-specific Assistance for Students</h2>
                    </div>

                    <div className="services-cards">
                        <div className="service-card">
                            <div className="service-image-container">
                                <img src={counselingImage || "/placeholder.svg"} alt="Educational Counseling" className="service-image" />
                            </div>
                            <h3 className="service-title">Educational Counseling</h3>
                            <p className="service-description">
                                Personalized guidance to match students' academic background and career aspirations with the right programs.
                            </p>
                            <Link to="/about" className="service-link">
                                Learn more <FaArrowRight className="service-icon" />
                            </Link>

                        </div>

                        <div className="service-card">
                            <div className="service-image-container">
                                <img src={universityImage || "/placeholder.svg"} alt="University/College Admissions" className="service-image" />
                            </div>
                            <h3 className="service-title">University/College Admissions</h3>
                            <p className="service-description">
                                Assistance with applications, document preparation, and enrollment processes.
                            </p>
                            <Link to="/about" className="service-link">
                                Learn more <FaArrowRight className="service-icon" />
                            </Link>

                        </div>

                        <div className="service-card">
                            <div className="service-image-container">
                                <img src={supportImage || "/placeholder.svg"} alt="Post-Admission Support" className="service-image" />
                            </div>
                            <h3 className="service-title">Post-Admission Support</h3>
                            <p className="service-description">
                                Assistance with accommodation selection, travel planning, and cultural orientation.
                            </p>
                            <Link to="/about" className="service-link">
                                Learn more <FaArrowRight className="service-icon" />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="content-section">
                <h2>Our Services</h2>
                <p>Discover our comprehensive visa and immigration services...</p>
            </div>

            <div className="content-section">
                <h2>Why Choose Us?</h2>
                <p>With years of experience and high success rates...</p>
            </div>
        </div>
    );
};

export default Home;