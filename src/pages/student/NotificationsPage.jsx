import React from 'react';

const NotificationsPage = () => {
    const activities = [
        { time: '09:46', desc: 'Payment received from John Doe of $385.90', color: 'purple' },
        { time: '09:46', desc: 'New sale recorded #ML-3467', color: 'yellow' },
        { time: '09:46', desc: 'Payment was made of $64.95 to Michael', color: 'yellow' },
        { time: '09:46', desc: 'New sale recorded #ML-3467', color: 'teal' },
        { time: '09:46', desc: 'Project meeting', color: 'pink' },
    ];

    return (
        <div className="activity-section full">
            <h2>Notifications</h2>
            <ul className="activity-list">
                {activities.map((a, i) => (
                    <li key={i}>
                        <span className={`dot ${a.color}`}></span>
                        <div>
                            <small>{a.time}</small>
                            <p>{a.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;
