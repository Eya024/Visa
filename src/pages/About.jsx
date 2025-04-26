import React from 'react';
import '../styles/about.css';
import founderImage from '../assets/images/founderImage.jpeg';
import zainebImage from '../assets/images/Zaineb Maddouri.jpg'; // Add your image paths
import ibrahimImage from '../assets/images/IbrahimMostafa.jpeg'; // Add your image paths

const About = () => {
  return (
    <div>
      {/* Existing About Us section */}
      <div className="about-container">
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p className="about-text">
            We are here to help<br />
            students achieve their<br />
            academic dreams
          </p>
        </div>
      </div>

      {/* Founder section with image */}
      <div className="founder-container">
        <div className="founder-content">
          <div className="founder-text">
            <h2 className="founder-title">Founder & Head of Agency</h2>
            <div className="divider"></div>
            <p className="founder-description">
              At Elegant Services, we are committed to empowering students to achieve their educational dreams abroad. By collaborating closely with prestigious academic institutions, we ensure a smooth admission process and provide personalized support.
            </p>
            <p className="founder-name">MR. Mohammad Al Hussein</p>
          </div>
          <div className="founder-image">
            <img src={founderImage} alt="Founder MR. Mohammad Al Hussein" />
          </div>
        </div>
      </div>

      {/* Vision & Mission section */}
      <div className="vision-mission-container">
        <div className="vision-mission-content">
          <div className="vision-section">
            <h2 className="vision-title">VISION</h2>
            <div className="divider"></div>
            <p className="vision-text">
              To be a global leader in international education recruitment, recognized for fostering meaningful partnerships and delivering exceptional results
            </p>
          </div>
          <div className="mission-section">
            <h2 className="mission-title">MISSION</h2>
            <div className="divider"></div>
            <p className="mission-text">
              To empower students from the MENA region by providing access to world class education and creating opportunities for personal and professional growth.
            </p>
          </div>
        </div>
      </div>

      {/* New Experts section */}
      <div className="experts-container">
        <div className="experts-content">
          <div className="experts-heading">
            <h2 className="experts-title">Experts to Guide You to Academic Excellence</h2>
            <div className="divider-full"></div>
          </div>
          <div className="consultants-grid">
            <div className="consultant-card">
              <img
                src={zainebImage}
                alt="Zaineb Maddouri"
                className="consultant-image"
              />
              <h3 className="consultant-name">Zaineb Maddouri</h3>
              <p className="consultant-position">Education Consultant in Tunisia branch</p>
            </div>
            <div className="consultant-card">
              <img
                src={ibrahimImage}
                alt="Ibrahim Mostafa"
                className="consultant-image"
              />
              <h3 className="consultant-name">Ibrahim Mostafa</h3>
              <p className="consultant-position">Education Consultant in Egypt branch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;