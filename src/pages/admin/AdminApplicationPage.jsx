import React, { useState, useEffect } from 'react';
import '../../styles/student/studentDashboard.css';
import { checkLoggedIn } from '../../utils/auth';

const AdminApplication = () => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [lastVisitTime, setLastVisitTime] = useState(null);
    const [applicationsList, setApplicationsList] = useState([]); // Store list of applications
    const [selectedApp, setSelectedApp] = useState(null); // Store selected application details
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            const user = await checkLoggedIn();
            if (user && user.id) {
                // Record the visit
                try {
                    await fetch(`http://localhost:8000/api/notifications/record-visit/`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: user.id,
                            page_name: 'AdminApplication'
                        })
                    });

                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/AdminApplication/`, {
                        credentials: 'include'
                    });
                    const visitData = await visitRes.json();
                    if (visitData.last_visited_at) {
                        setLastVisitTime(new Date(visitData.last_visited_at));
                    }
                } catch (error) {
                    console.error('Failed to fetch or record visit time:', error);
                    setError('Failed to record or fetch visit time.');
                }

                // Fetch the list of applications
                try {
                    setLoading(true);
                    const appsRes = await fetch(`http://localhost:8000/api/applications/list/`, {
                        credentials: 'include'
                    });
                    const appsData = await appsRes.json();
                    setApplicationsList(appsData);
                } catch (error) {
                    console.error('Failed to fetch applications:', error);
                    setError('Failed to fetch applications.');
                } finally {
                    setLoading(false);
                }
            } else {
                console.warn('User not logged in or missing ID');
                setError('User not logged in or missing ID.');
            }
        };

        fetchData();
    }, []);

    // Fetch application details when a user is selected
    useEffect(() => {
        const fetchApplicationDetails = async () => {
            if (selectedUserId) {
                try {
                    setLoading(true);
                    setError(null);
                    const appRes = await fetch(`http://localhost:8000/api/applications/user/${selectedUserId}/`, {
                        credentials: 'include'
                    });
                    const appData = await appRes.json();
                    if (appData.exists) {
                        setSelectedApp(appData.data);
                    } else {
                        setSelectedApp(null);
                        setError('No application found for this user.');
                    }
                } catch (error) {
                    console.error('Failed to fetch application details:', error);
                    setError('Failed to fetch application details.');
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedApp(null); // Reset selected app when no user is selected
            }
        };

        fetchApplicationDetails();
    }, [selectedUserId]);

    return (
        <div className="activity-section full">
            <h2>Admin Application</h2>
            {lastVisitTime && (
                <p style={{ fontStyle: 'italic', color: 'gray' }}>
                    Last visited: {lastVisitTime.toLocaleString()}
                </p>
            )}
            {loading && (
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
                    Loading...
                </div>
            )}
            {error && (
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#ff5c5c' }}>
                    {error}
                </div>
            )}
            <div className="form-group">
                <label>Select User</label>
                <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                    <option value="">-- Select a User --</option>
                    {applicationsList.map(app => (
                        <option key={app.user_id} value={app.user_id}>
                            {`${app.user_id} --- ${app.full_name}`}
                        </option>
                    ))}
                </select>
            </div>

            {!selectedUserId ? (
                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#888' }}>
                    Please select a user to proceed.
                </div>
            ) : !selectedApp ? (
                <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: '#888' }}>
                    No application data available.
                </div>
            ) : (
                <form className="application-form" style={{ marginTop: '2rem' }}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" value={selectedApp.full_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={selectedApp.email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={selectedApp.phone_number || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" value={selectedApp.date_of_birth || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Passport Number</label>
                            <input type="text" value={selectedApp.passport_number || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Nationality</label>
                            <input type="text" value={selectedApp.nationality || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Destination Country</label>
                            <input type="text" value={selectedApp.destination_country || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Visa Type</label>
                            <input type="text" value={selectedApp.visa_type || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Purpose of Travel</label>
                            <input type="text" value={selectedApp.purpose_of_travel || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Duration of Stay</label>
                            <input type="text" value={selectedApp.duration_of_stay || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Occupation</label>
                            <input type="text" value={selectedApp.occupation || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Education Level</label>
                            <input type="text" value={selectedApp.education_level || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Marital Status</label>
                            <input type="text" value={selectedApp.marital_status || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Supporting Documents</label>
                            <input type="text" value={selectedApp.supporting_documents || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Additional Notes</label>
                            <input type="text" value={selectedApp.additional_notes_file || ''} readOnly />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdminApplication;