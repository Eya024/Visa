import React, { useState, useEffect } from 'react';
import '../../styles/student/studentDashboard.css';
import { checkLoggedIn } from '../../utils/auth';

const AppointmentPage = () => {
    const [studentId, setStudentId] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [appointmentId, setAppointmentId] = useState(null);
    const [isEditing, setIsEditing] = useState(true);
    const [availabilities, setAvailabilities] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');


    useEffect(() => {
        checkLoggedIn().then(data => {
            if (data?.id) {
                setStudentId(data.id);
            }
        }

        );
    }, []);

    useEffect(() => {
        if (!studentId) return;

        fetch(`http://localhost:8000/api/appointments/student/${studentId}/`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    const app = data[0];
                    setAppointment({ ...app, availabilities: app.availabilities || [] }); // ✅ SAFEGUARD
                    setAppointmentId(app.id);
                    setIsEditing(false);
                    setReason(app.reason);
                    setAvailabilities(app.availabilities);
                } else {
                    setAppointment(null);
                    setIsEditing(true);
                }
            })
            .catch(console.error);
    }, [studentId]);


    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (!userID) return;

        const recordVisit = async () => {
            try {
                await fetch('http://localhost:8000/api/notifications/record-visit/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: parseInt(userID),
                        page_name: 'AppointmentPage',
                    }),
                });
            } catch (err) {
                console.error('Failed to record visit', err);
            }
        };

        recordVisit();
    }, []);

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (!userID) return;

        const fetchLastVisit = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/notifications/last-visit/${userID}/AppointmentPage`);
                const data = await res.json();
                console.log('Last visited at:', data.last_visited_at);
                // You can store this in a state variable and show it if needed
            } catch (err) {
                console.error('Failed to fetch last visit', err);
            }
        };

        fetchLastVisit();
    }, []);



    const addAvailability = () => {
        if (!day || !time) return;
        setAvailabilities([...availabilities, { day, time }]);
        setDay('');
        setTime('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!studentId || availabilities.length === 0) {
            alert("Please fill in required fields.");
            return;
        }

        const payload = { student_id: studentId, availabilities, reason };
        const url = isEditing && appointmentId
            ? `http://localhost:8000/api/appointments/update/${appointmentId}/`
            : 'http://localhost:8000/api/appointments/create/';
        const method = isEditing && appointmentId ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(data => {
                alert(isEditing ? 'Appointment updated!' : 'Appointment submitted!');
                setAppointment(data);
                setAppointmentId(data.id);
                setIsEditing(false);
            })
            .catch(console.error);
    };

    const handleDelete = () => {
        if (!appointmentId) return;
        fetch(`http://localhost:8000/api/appointments/update/${appointmentId}/`, {
            method: 'DELETE',
        })
            .then(() => {
                alert('Appointment deleted');
                setAppointment(null);
                setAppointmentId(null);
                setIsEditing(true);
                setReason('');
                setAvailabilities([]);
            })
            .catch(console.error);
    };

    if (!studentId) return <p>Loading user info, please wait...</p>;

    if (!isEditing && appointment) {
        return (
            <div className="activity-section full">
                <h2 className="section-title">Your Appointment</h2>
                <div className="appointment-summary">
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                    <p><strong>Availabilities:</strong></p>
                    <ul>
                        {Array.isArray(appointment?.availabilities) && appointment.availabilities.map((a, i) => (
                            <li key={i}>{a.day} at {a.time}</li>
                        ))}

                    </ul>
                    <div className="button-group">
                        <button className="btn primary" onClick={() => setIsEditing(true)}>Update</button>
                        <button className="btn danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="activity-section full">
            <h2 className="section-title">{appointment ? 'Update Appointment' : 'Book an Appointment'}</h2>
            <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Select Day</label>
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Choose a day</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Time</label>
                        <select value={time} onChange={(e) => setTime(e.target.value)}>
                            <option value="">Choose a time</option>
                            <option>09:00 AM</option>
                            <option>11:00 AM</option>
                            <option>01:00 PM</option>
                            <option>03:00 PM</option>
                            <option>05:00 PM</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <button type="button" className="btn primary" onClick={addAvailability}>
                            Add Availability
                        </button>
                    </div>

                    {availabilities.length > 0 && (
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Added Availabilities:</label>
                            <ul>
                                {availabilities.map((entry, idx) => (
                                    <li key={idx}>{entry.day} at {entry.time}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Reason for Appointment</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Visa inquiry, document submission, etc."
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn primary" type="submit" disabled={!studentId}>
                        {appointment ? 'Update' : 'Submit'}
                    </button>
                    <button
                        className="btn danger"
                        type="button"
                        onClick={() => {
                            setDay('');
                            setTime('');
                            setReason('');
                            setAvailabilities([]);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AppointmentPage;
