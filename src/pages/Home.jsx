// Home.jsx
import React, { useEffect } from 'react';
import '../styles/home.css';
import homeVideo from '../assets/videos/home1.mp4';
import { FaArrowRight } from 'react-icons/fa';
import aboutImage from '../assets/images/about-us.jpg'; // Add your image path here
import counselingImage from '../assets/images/counseling.jpg'; // Add your image paths
import universityImage from '../assets/images/university.jpg';
import supportImage from '../assets/images/support.jpg';
import { Link } from 'react-router-dom';
import businessSchool from '../assets/images/businessSchool.png';
import cimt from '../assets/images/cimt.png';
import eurospeak from '../assets/images/eurospeak.png';
import imperial from '../assets/images/imperial.png';
import sheridan from '../assets/images/sheridan.png';
import TurkUni from '../assets/images/TurkUni.png';
import canadaCollege from '../assets/images/canadaCollege.png';





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

            <section className="values-section">
                <div className="values-container">
                    <div className="values-content">
                        <h2 className="values-heading">Elevate Your Academic Journey with Us</h2>
                        <p className="values-description">
                            With years of experience in international education, our team has successfully helped countless students secure admissions to top Canadian universities and colleges.
                        </p>

                        <ul className="values-list">
                            <li>Personalized Guidance</li>
                            <li>Expert Knowledge</li>
                            <li>Commitment to Success</li>
                        </ul>

                        <button className="values-button">Know more</button>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Integrity</h3>
                            <p>Transparency and honesty in every interaction</p>
                        </div>

                        <div className="value-card">
                            <h3>Collaboration</h3>
                            <p>Building strong partnerships with institutions and students</p>
                        </div>

                        <div className="value-card">
                            <h3>Excellence</h3>
                            <p>Commitment to delivering the highest quality of service</p>
                        </div>

                        <div className="value-card">
                            <h3>Diversity</h3>
                            <p>Embracing multiculturalism and inclusivity</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="partners-section">
                <div className="partners-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Partners</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="partners-carousel">
                        <div className="partners-track">
                            <div className="partner-logo">
                                <img src={eurospeak} alt="eurospeak" />
                            </div>
                            <div className="partner-logo">
                                <img src={businessSchool} alt="Business School" />
                            </div>
                            <div className="partner-logo">
                                <img src={imperial} alt="Imperial" />
                            </div>
                            <div className="partner-logo">
                                <img src={sheridan} alt="Sheridan" />
                            </div>
                            <div className="partner-logo">
                                <img src={TurkUni} alt="TurkUni" />
                            </div>
                            <div className="partner-logo">
                                <img src={cimt} alt="cimt" />
                            </div>
                            <div className="partner-logo">
                                <img src={canadaCollege} alt="Canada College" />
                            </div>
                            {/* Duplicated logos for seamless looping */}
                            <div className="partner-logo">
                                <img src={eurospeak} alt="EUROSPEAK" />
                            </div>
                            <div className="partner-logo">
                                <img src={businessSchool} alt="Business School" />
                            </div>
                            <div className="partner-logo">
                                <img src={imperial} alt="Imperial" />
                            </div>
                            <div className="partner-logo">
                                <img src={sheridan} alt="Sheridan" />
                            </div>
                            <div className="partner-logo">
                                <img src={TurkUni} alt="TurkUni" />
                            </div>
                            <div className="partner-logo">
                                <img src={cimt} alt="CIMT" />
                            </div>
                            <div className="partner-logo">
                                <img src={canadaCollege} alt="Canada College" />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="trusted-partner-section">
                <div className="trusted-partner-overlay">
                    <div className="trusted-partner-content">
                        <h2 className="trusted-partner-heading">
                            Your Trusted Partner in<br />
                            <span>International Education</span>
                        </h2>
                        <p className="trusted-partner-text">
                            Discover a universe of educational opportunities with our expert support.
                        </p>
                        <button className="trusted-partner-button">
                            Contact us
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;