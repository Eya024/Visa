import React, { useEffect, useState } from 'react';
import { checkLoggedIn } from '../../utils/auth';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const fetchNotifications = async () => {
            const user = await checkLoggedIn();
            if (user && user.id) {
                try {
                    const res = await fetch(`http://localhost:8000/api/notifications/user/${user.id}/`, {
                        credentials: 'include',
                    });
                    const data = await res.json();
                    console.log('Notifications:', data);
                    setNotifications(data);
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                }
            } else {
                console.warn('User not logged in or missing ID');
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="activity-section full">
            <h2>Notifications</h2>
            <ul className="activity-list">
                
                {notifications.map((n, i) => (
                    <li key={i}>
                        <span className="dot yellow"></span>
                        <div>
                            <small>{new Date(n.created_at).toLocaleTimeString()}</small>
                            <p><strong>{n.title}</strong>: {n.message}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;
