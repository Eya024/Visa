import React, { useState } from 'react';
import '../../styles/student/studentDashboard.css';

const dummyApplications = {
    '123': {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        dob: '1990-01-01',
        passport: 'AB1234567',
        nationality: 'Indian',
        destination: 'France',
        visaType: 'Student',
        purpose: 'Studies',
        duration: '3 months',
        occupation: 'Software Engineer',
        education: 'Master',
        maritalStatus: 'Single',
        documents: 'https://docs.example.com/passport.pdf',
        notes: 'N/A'
    },
    '456': {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1987654321',
        dob: '1992-05-15',
        passport: 'CD7890123',
        nationality: 'Canadian',
        destination: 'USA',
        visaType: 'Tourist',
        purpose: 'Tourism',
        duration: '2 weeks',
        occupation: 'Designer',
        education: 'Bachelor',
        maritalStatus: 'Married',
        documents: 'https://docs.example.com/idcard.pdf',
        notes: 'Allergic to peanuts.'
    }
};

const AdminApplication = () => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const selectedApp = dummyApplications[selectedUserId];

    return (
        <div className="activity-section full">
            <div className="form-group">
                <label>Select User</label>
                <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                    <option value="">-- Select a User --</option>
                    {Object.entries(dummyApplications).map(([id, data]) => (
                        <option key={id} value={id}>{`${id} --- ${data.name}`}</option>
                    ))}
                </select>
            </div>

            {!selectedUserId ? (
                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#888' }}>
                    Please select an ID to proceed.
                </div>
            ) : (
                <form className="application-form" style={{ marginTop: '2rem' }}>
                    <div className="form-grid">
                        <div className="form-group"><label>Full Name</label><input type="text" value={selectedApp.name} readOnly /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={selectedApp.email} readOnly /></div>
                        <div className="form-group"><label>Phone Number</label><input type="tel" value={selectedApp.phone} readOnly /></div>
                        <div className="form-group"><label>Date of Birth</label><input type="date" value={selectedApp.dob} readOnly /></div>
                        <div className="form-group"><label>Passport Number</label><input type="text" value={selectedApp.passport} readOnly /></div>
                        <div className="form-group"><label>Nationality</label><input type="text" value={selectedApp.nationality} readOnly /></div>
                        <div className="form-group"><label>Destination Country</label><input type="text" value={selectedApp.destination} readOnly /></div>
                        <div className="form-group"><label>Visa Type</label><input type="text" value={selectedApp.visaType} readOnly /></div>
                        <div className="form-group"><label>Purpose of Travel</label><input type="text" value={selectedApp.purpose} readOnly /></div>
                        <div className="form-group"><label>Duration of Stay</label><input type="text" value={selectedApp.duration} readOnly /></div>
                        <div className="form-group"><label>Occupation</label><input type="text" value={selectedApp.occupation} readOnly /></div>
                        <div className="form-group"><label>Education Level</label><input type="text" value={selectedApp.education} readOnly /></div>
                        <div className="form-group"><label>Marital Status</label><input type="text" value={selectedApp.maritalStatus} readOnly /></div>
                        <div className="form-group"><label>Supporting Documents</label><input type="text" value={selectedApp.documents} readOnly /></div>
                        <div className="form-group"><label>Additional Notes</label><input type="text" value={selectedApp.notes} readOnly /></div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdminApplication;
