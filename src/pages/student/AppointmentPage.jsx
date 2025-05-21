import React, { useState, useEffect } from 'react';  // add useEffect here
import '../../styles/student/studentDashboard.css';
import { checkLoggedIn } from '../../utils/auth'; // adjust path if needed


const AppointmentPage = () => {
    const [studentId, setStudentId] = useState(null);  // add this state

    const [availabilities, setAvailabilities] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        checkLoggedIn().then(data => {
            console.log('checkLoggedIn returned:', data);
            if (data?.id) {
                setStudentId(data.id);
            }
        });
    }, []);

    console.log('studentId:', studentId); // to check current state on every render



    const addAvailability = () => {
        if (!day || !time) return;
        const newEntry = { day, time };
        setAvailabilities([...availabilities, newEntry]);
        setDay('');
        setTime('');
    };





    const handleSubmit = (e) => {
        e.preventDefault();
        if (availabilities.length === 0) {
            alert("Please add at least one availability.");
            return;
        }

        if (!studentId) {
            alert("Student not identified. Please login.");
            return;
        }

        // include studentId here before sending
        const combinedInfo = {
            student_id: studentId,
            availabilities,
            reason,
        };

        fetch('http://localhost:8000/api/appointments/create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combinedInfo),
        })
            .then(res => res.json())
            .then(data => {
                alert('Appointment submitted!');
                setAvailabilities([]);
                setReason('');
            })
            .catch(err => console.error(err));
    };

    if (!studentId) {
        return <p>Loading user info, please wait...</p>;
    }



    return (
        <div className="activity-section full">
            <h2>Book an Appointment</h2>
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
                        Submit
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
