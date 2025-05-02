import React from 'react';
import '../../styles/student/studentDashboard.css';

const ApplicationPage = () => {
    return (
        <div className="activity-section full">
            <h2>Form</h2>
            <form className="application-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <select><option>India</option></select>
                    </div>
                    <div className="form-group">
                        <label>Your email</label>
                        <input type="email" placeholder="name@matdash.com" />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select><option>Delhi</option></select>
                    </div>
                    <div className="form-group">
                        <label>Your password</label>
                        <input type="password" />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <select><option>Rajkot</option></select>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn primary">Submit</button>
                    <button className="btn danger" type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationPage;
