import React, { useEffect, useState } from 'react';
import { checkLoggedIn } from '../../utils/auth';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [lastVisitTime, setLastVisitTime] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            const user = await checkLoggedIn();
            if (user && user.id) {
                try {
                    // ✅ Record the visit
                    await fetch(`http://localhost:8000/api/notifications/record-visit/`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_id: user.id,
                            page_name: 'Notifications'
                        })
                    });

                    // ✅ Get last visit time
                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/Notifications/`, {
                        credentials: 'include'
                    });
                    const visitData = await visitRes.json();
                    if (visitData.last_visited_at) {
                        setLastVisitTime(new Date(visitData.last_visited_at));
                    }

                    // ✅ Fetch notifications
                    const res = await fetch(`http://localhost:8000/api/notifications/user/${user.id}/`, {
                        credentials: 'include',
                    });
                    const data = await res.json();
                    setNotifications(data.reverse());

                    // ✅ Mark all as seen
                    await fetch(`http://localhost:8000/api/notifications/mark-all-as-seen/${user.id}/`, {
                        method: 'POST',
                        credentials: 'include',
                    });

                } catch (error) {
                    console.error('Failed to fetch or mark notifications:', error);
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
            {lastVisitTime && (
                <p style={{ fontStyle: 'italic', color: 'gray' }}>
                    Last visited: {lastVisitTime.toLocaleString()}
                </p>
            )}
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
