import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div>
      {/* Admission Section */}
      <div className="admission-container">
        <div className="admission-content">
          <h1 className="admission-title">ADMISSION</h1>
          <h2 className="admission-subtitle">Ready to enroll?</h2>
          <p className="admission-text">We hope to meet you soon.</p>
          <p className="admission-description">
            Elegant Services is here to help you study in Canada. Follow these steps to begin your journey
          </p>
          <button className="admission-button">Get Started</button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-container">
        <form className="contact-form">
          <label>Your Name <span>*</span></label>
          <input type="text" required />

          <label>Your Email <span>*</span></label>
          <input type="email" required />

          <label>Your Phone Number <span>*</span></label>
          <input type="tel" required />

          <label>Your Country <span>*</span></label>
          <input type="text" required />

          <label>Your Message<span>*</span></label>
          <textarea rows="4" required></textarea>

          <button type="submit" className="contact-submit">Send</button>
        </form>
      </div>

      {/* Canada Branch */}
      <div className="branch-container">
        <div className="branch-info">
          <h2 className="branch-title">Canada Branch</h2>
          <div className="branch-detail">
            <h4>Address</h4>
            <p>Matheson Blvd E Mississauga</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Phone</h4>
            <p>+16479046267</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Email</h4>
            <p>support@elegant-visa.ca</p>
          </div>
        </div>
        <div className="branch-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.7523427425754!2d-79.87242112378514!3d43.25661197799073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b35707e62937d%3A0x38592bee9e40a090!2sElegant%20Public%20Services!5e0!3m2!1sen!2stn!4v1745940875333!5m2!1sen!2stn"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Canada Branch Map"
          ></iframe>
        </div>
      </div>

      {/* Tunisia Branch */}
      <div className="branch-container">
        <div className="branch-info">
          <h2 className="branch-title">Tunisia Branch</h2>
          <div className="branch-detail">
            <h4>Address</h4>
            <p>Rue Hassib Ben Ammar Lac 1</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Phone</h4>
            <p>+(216)54474628</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Email</h4>
            <p>tunisa@elegant-visa.ca</p>
          </div>
        </div>
        <div className="branch-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d408729.20932082576!2d10.237073000000002!3d36.837759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35e65ba20dbd%3A0x480b53ae7ddfb0b9!2sElegant%20Administrative%20Services!5e0!3m2!1sen!2sus!4v1745941130881!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Tunisia Branch Map"
          ></iframe>
        </div>
      </div>

      {/* Egypt Branch */}
      <div className="branch-container">
        <div className="branch-info">
          <h2 className="branch-title">Egypt Branch</h2>
          <div className="branch-detail">
            <h4>Address</h4>
            <p>Sheraton Cairo</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Phone</h4>
            <p>+201287660035</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Email</h4>
            <p>egypt@elegant-visa.ca</p>
          </div>
        </div>
        <div className="branch-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d441830.31838937465!2d31.371500000000005!3d30.099932000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458174c9b5555c1%3A0xb992bed14abb0263!2zRWxlZ2FudCBWaXNhIENhbmFkYSAvINin2YTZh9is2LHYqSDYp9mE2Ykg2YPZhtiv2Kc!5e0!3m2!1sen!2sus!4v1745941391747!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Egypt Branch Map"
          ></iframe>
        </div>
      </div>

      {/* Jordan Branch */}
      <div className="branch-container">
        <div className="branch-info">
          <h2 className="branch-title">Jordan Branch</h2>
          <div className="branch-detail">
            <h4>Address</h4>
            <p>Amman AL Waha</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Phone</h4>
            <p>+962776030203</p>
            <hr />
          </div>
          <div className="branch-detail">
            <h4>Email</h4>
            <p>support@elegant-visa.ca</p>
          </div>
        </div>
        <div className="branch-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d433141.2503825579!2d35.869715!3d31.990291999999997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca1d22b051f09%3A0xfbc3e3e709bf0979!2sElegant%20Services!5e0!3m2!1sen!2sus!4v1745941491796!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Jordan Branch Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
