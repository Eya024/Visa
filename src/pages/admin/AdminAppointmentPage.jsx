import React, { useState, useEffect } from 'react';
import { checkLoggedIn } from '../../utils/auth';
import styles from '../../styles/admin/adminAppointmentPage.module.css';

const AdminAppointmentPage = () => {
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);
    const [lastVisitTime, setLastVisitTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = await checkLoggedIn();
            if (user && user.id) {
                try {
                    await fetch(`http://localhost:8000/api/notifications/record-visit/`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: user.id,
                            page_name: 'AdminAppointment'
                        })
                    });

                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/AdminAppointment/`, {
                        credentials: 'include'
                    });
                    if (!visitRes.ok) {
                        const errorText = await visitRes.text();
                        console.error(`Failed to fetch visit data: ${visitRes.status} ${visitRes.statusText}`, errorText);
                        return;
                    }
                    const visitData = await visitRes.json();
                    if (visitData.last_visited_at) {
                        setLastVisitTime(new Date(visitData.last_visited_at));
                    }
                } catch (error) {
                    console.error('Failed to fetch or record visit time:', error);
                    setError('Failed to record or fetch visit time.');
                }

                try {
                    setLoading(true);
                    const apptRes = await fetch('http://localhost:8000/api/appointments/list/', {
                        credentials: 'include'
                    });
                    if (!apptRes.ok) {
                        const errorText = await apptRes.text();
                        console.error(`Failed to fetch appointments: ${apptRes.status} ${apptRes.statusText}`, errorText);
                        setError(`Failed to fetch appointments: ${apptRes.status} ${apptRes.statusText}`);
                        return;
                    }
                    const apptData = await apptRes.json();
                    setAppointmentsList(apptData);
                } catch (error) {
                    console.error('Failed to fetch appointments:', error);
                    setError('Failed to fetch appointments.');
                }

                try {
                    const statusRes = await fetch('http://localhost:8000/api/appointments/statuses/', {
                        credentials: 'include'
                    });
                    if (!statusRes.ok) {
                        const errorText = await statusRes.text();
                        console.error(`Failed to fetch status choices: ${statusRes.status} ${statusRes.statusText}`, errorText);
                        setError(`Failed to fetch status choices: ${statusRes.status} ${statusRes.statusText}`);
                        return;
                    }
                    const statusData = await statusRes.json();
                    setStatusChoices(statusData.status_choices);
                } catch (error) {
                    console.error('Failed to fetch status choices:', error);
                    setError('Failed to fetch status choices.');
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

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (selectedStudentId) {
                try {
                    setLoading(true);
                    setError(null);
                    const apptRes = await fetch(`http://localhost:8000/api/appointments/student/${selectedStudentId}/`, {
                        credentials: 'include'
                    });
                    if (!apptRes.ok) {
                        const errorText = await apptRes.text();
                        console.error(`Failed to fetch appointment details: ${apptRes.status} ${apptRes.statusText}`, errorText);
                        setError(`Failed to fetch appointment details: ${apptRes.status} ${apptRes.statusText}`);
                        return;
                    }
                    const apptData = await apptRes.json();
                    if (apptData.length > 0) {
                        setSelectedAppointments(apptData);
                    } else {
                        setSelectedAppointments([]);
                        setError('No appointments found for this student.');
                    }
                } catch (error) {
                    console.error('Failed to fetch appointment details:', error);
                    setError('Failed to fetch appointment details.');
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedAppointments([]);
            }
        };

        fetchAppointmentDetails();
    }, [selectedStudentId]);

    const updateStatus = (id, newStatus) => {
        fetch(`http://localhost:8000/api/appointments/update/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            setSelectedAppointments(prev =>
                prev.map(appt => appt.id === id ? { ...appt, status: data.status } : appt)
            );
            setAppointmentsList(prev =>
                prev.map(appt => appt.id === id ? { ...appt, status: data.status } : appt)
            );
        })
        .catch(err => {
            console.error('Failed to update status:', err);
            setError('Failed to update status.');
        });
    };

    const uniqueStudents = Array.from(
        new Map(
            appointmentsList.map(appt => [appt.student_id, { id: appt.student_id, username: appt.student }])
        ).values()
    );

    return (
        <div className={`${styles["activity-section"]} ${styles.full}`}>
            <h2>Appointments</h2>
            {lastVisitTime && (
                <p className={styles["last-visited"]}>
                    Last visited: {lastVisitTime.toLocaleString()}
                </p>
            )}
            {loading && (
                <div className={styles["loading-spinner"]}>
                    Loading... 🔄
                </div>
            )}
            {error && (
                <div className={styles["error-message"]}>
                    {error}
                </div>
            )}
            <div className={styles["form-group"]}>
                <label>Select Student</label>
                <select 
                    onChange={(e) => setSelectedStudentId(e.target.value)} 
                    value={selectedStudentId}
                    className={styles.select}
                >
                    <option value="">-- Select a Student --</option>
                    {uniqueStudents.map(student => (
                        <option key={student.id} value={student.id}>
                            {`${student.id} - ${student.username}`}
                        </option>
                    ))}
                </select>
            </div>

            {!selectedStudentId ? (
                <div className={styles["info-message"]}>
                    Please select a student to proceed.
                </div>
            ) : selectedAppointments.length === 0 ? (
                <div className={styles["info-message"]}>
                    No appointment data available.
                </div>
            ) : (
                <ul className={styles["activity-list"]}>
                    {selectedAppointments.map((appt, index) => (
                        <li key={appt.id || index} className={styles["appointment-item"]}>
                            <span className={`${styles.dot} ${styles.teal}`}></span>
                            <div className={styles["appointment-details"]}>
                                <small>{new Date(appt.created_at).toLocaleString()}</small>
                                <p>
                                    <strong>Student:</strong> {appt.student}<br />
                                    <strong>Reason:</strong> {appt.reason}<br />
                                    <strong>Status:</strong>
                                    <select
                                        value={appt.status}
                                        onChange={(e) => updateStatus(appt.id, e.target.value)}
                                        className={styles["status-select"]}
                                    >
                                        {statusChoices.map(choice => (
                                            <option key={choice} value={choice}>
                                                {choice.charAt(0).toUpperCase() + choice.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {appt.availabilities && appt.availabilities.length > 0 && (
                                        <>
                                            <br />
                                            <strong>Availabilities:</strong>
                                            <ul className={styles["availability-list"]}>
                                                {appt.availabilities.map((slot, idx) => (
                                                    <li key={idx}>
                                                        {slot.day} at {slot.time}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminAppointmentPage;