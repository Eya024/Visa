import React from 'react';
import '../styles/services.css';
import counseling from '../assets/images/counseling.jpg';
import support from '../assets/images/support.jpg';


const Services = () => {
  return (
    <div className="services-container">
      <div className="services-stack">
        {/* Service 1 - Image on right */}
        <div className="service-card">
          <div className="service-content-wrapper">
            <div className="service-text">
              <div className="service-number">01</div>
              <h2 className="service-name">Academic Counseling</h2>
              <p className="service-description">
                Personalized guidance to help students choose programs and institutions that align with their goals.
              </p>
              <div className="service-features">
                <p>✓ Goal Alignment</p>
                <p>✓ Interest Assessment</p>
              </div>
              <button className="contact-button">Contact us</button>
            </div>
            <div className="service-image">
              <img src={counseling} alt="Academic Counseling" />
            </div>
          </div>
        </div>

        {/* Service 2 - Image on left */}
        <div className="service-card">
          <div className="service-content-wrapper image-left">
            <div className="service-image">
              <img src={support} alt="University Applications" />
            </div>
            <div className="service-text">
              <div className="service-number">02</div>
              <h2 className="service-name">University and College Applications</h2>
              <p className="service-description">
                Assistance in preparing and submitting successful applications to partner institutions.
              </p>
              <div className="service-features">
                <p>✓ Reputation and Ranking</p>
                <p>✓ Cultural Fit</p>
              </div>
              <button className="contact-button">Contact us</button>
            </div>
          </div>
        </div>

        {/* Service 3 - Image on right */}
        <div className="service-card">
          <div className="service-content-wrapper">
            <div className="service-text">
              <div className="service-number">03</div>
              <h2 className="service-name">Visa Application Support</h2>
              <p className="service-description">
                Expert guidance through the entire visa application process to ensure approval.
              </p>
              <div className="service-features">
                <p>✓ Document Preparation</p>
                <p>✓ Interview Coaching</p>
              </div>
              <button className="contact-button">Contact us</button>
            </div>
            <div className="service-image">
              <img src={support} alt="Visa Application Support" />
            </div>
          </div>
        </div>

        {/* Service 4 - Image on left */}
        <div className="service-card">
          <div className="service-content-wrapper image-left">
            <div className="service-image">
              <img src={counseling} alt="Test Preparation" />
            </div>
            <div className="service-text">
              <div className="service-number">04</div>
              <h2 className="service-name">Test Preparation</h2>
              <p className="service-description">
                Comprehensive training for language proficiency and academic entrance exams.
              </p>
              <div className="service-features">
                <p>✓ IELTS/TOEFL Training</p>
                <p>✓ SAT/ACT Preparation</p>
              </div>
              <button className="contact-button">Contact us</button>
            </div>
          </div>
        </div>

        {/* Service 5 - Image on right */}
        <div className="service-card">
          <div className="service-content-wrapper">
            <div className="service-text">
              <div className="service-number">05</div>
              <h2 className="service-name">Interview Preparation</h2>
              <p className="service-description">
                Specialized coaching to ace university admission and visa interviews.
              </p>
              <div className="service-features">
                <p>✓ Mock Interviews</p>
                <p>✓ Feedback Sessions</p>
              </div>
              <button className="contact-button">Contact us</button>
            </div>
            <div className="service-image">
              <img src={counseling} alt="Interview Preparation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;