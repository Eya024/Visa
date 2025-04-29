import React from 'react';
import '../styles/admission.css';

const Admission = () => {
  return (
    <div>
      {/* Existing Admission Section */}
      <div className="admission-container">
        <div className="admission-content">
          <h1 className="admission-title">ADMISSION</h1>
          <h2 className="admission-subtitle">Ready to enroll?</h2>
          <p className="admission-text">
            We hope to meet you soon.
          </p>
          <p className="admission-description">
            Elegant Services is here to help you study in Canada. Follow these steps to begin your journey
          </p>
          <button className="admission-button">Get Started</button>
        </div>
      </div>

      {/* New Process Section */}
      <div className="process-container">
        <div className="process-content">
          <h1 className="process-title">THE PROCESS</h1>
          
          <div className="process-steps">
            {/* Step 1 */}
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Contact us</h3>
                <p className="step-description">
                  Reach out to our team via email, phone, or by visiting one of our branches. 
                  We'll answer your questions and provide the information you need to start.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Prepare and send your documents</h3>
                <p className="step-description">
                  Gather and prepare all required documents, such as academic transcripts, IDs, 
                  and financial proof. Our team will guide you through this process.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Submit application</h3>
                <p className="step-description">
                  We'll help you submit your application to Canadian educational institutions 
                  and immigration authorities, ensuring it is complete and accurate.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3 className="step-title">Be patient and prepare for immigration</h3>
                <p className="step-description">
                  Be patient while your application is processed. We'll keep you updated. 
                  Use this time to prepare for your move by learning about Canadian culture 
                  and planning your travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;