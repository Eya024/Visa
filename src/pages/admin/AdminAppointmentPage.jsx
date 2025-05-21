import React, { useState, useEffect } from 'react';

const AdminAppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);

    useEffect(() => {
        fetch('/appointments/admin/1/')  // Replace 1 with real admin ID if needed
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.error('Failed to fetch appointments:', err));

        fetch('/appointments/statuses/')
            .then(res => res.json())
            .then(data => setStatusChoices(data.status_choices))
            .catch(err => console.error('Failed to fetch status choices:', err));
    }, []);

    const updateStatus = (id, newStatus) => {
        fetch(`/appointments/update/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            setAppointments(prev =>
                prev.map(appt => appt.id === id ? { ...appt, status: data.status } : appt)
            );
        })
        .catch(err => console.error('Failed to update status:', err));
    };

    return (
        <div className="activity-section full">
            <h2>Appointments</h2>
            <ul className="activity-list">
                {appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    appointments.map((appt, index) => (
                        <li key={index}>
                            <span className="dot teal"></span>
                            <div>
                                <small>{new Date(appt.date).toLocaleString()}</small>
                                <p>
                                    <strong>Student:</strong> {appt.student}<br />
                                    <strong>Reason:</strong> {appt.meeting_link}<br />
                                    <strong>Status:</strong>
                                    <select
                                        value={appt.status}
                                        onChange={(e) => updateStatus(appt.id, e.target.value)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        {statusChoices.map(choice => (
                                            <option key={choice} value={choice}>
                                                {choice.charAt(0).toUpperCase() + choice.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default AdminAppointmentPage;
