import React, { useState } from 'react';
import '../../styles/student/studentDashboard.css';
import notificationIcon from '../../assets/images/logos/notification.png';
import applicationIcon from '../../assets/images/logos/application.png';
import appointmentIcon from '../../assets/images/logos/appointment.png';
import logoutIcon from '../../assets/images/logos/logout.png';
import dashboardIcon from '../../assets/images/logos/dashboard.png';
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bg2.jpg';
import bg3 from '../../assets/images/bg3.jpg';

const StudentDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activePage, setActivePage] = useState('dashboard'); // new state to track page

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const products = [
        { img: '1', name: 'Minecraf App', assignee: 'Jason Roy', progress: '73.2%', priority: 'Low', budget: '$3.5k', badgeClass: 'low' },
        { img: '2', name: 'Web App Project', assignee: 'Mathew Flintoff', progress: '73.2%', priority: 'Medium', budget: '$3.5k', badgeClass: 'medium' },
        { img: '3', name: 'Modernize Dashboard', assignee: 'Anil Kumar', progress: '73.2%', priority: 'Very High', budget: '$3.5k', badgeClass: 'very-high' },
        { img: '4', name: 'Dashboard Co', assignee: 'George Cruize', progress: '73.2%', priority: 'High', budget: '$3.5k', badgeClass: 'high' },
    ];

    const activities = [
        { time: '09:46', desc: 'Payment received from John Doe of $385.90', color: 'purple' },
        { time: '09:46', desc: 'New sale recorded #ML-3467', color: 'yellow' },
        { time: '09:46', desc: 'Payment was made of $64.95 to Michael', color: 'yellow' },
        { time: '09:46', desc: 'New sale recorded #ML-3467', color: 'teal' },
        { time: '09:46', desc: 'Project meeting', color: 'pink' },
        { time: '09:46', desc: 'Payment received from John Doe of $385.90', color: 'purple' },
    ];

    const renderDashboard = () => (
        <>
            <div className="content">
                <div className="revenue-section">
                    <h2>Application Progress</h2>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Assigned</th>
                                <th>Progress</th>
                                <th>Priority</th>
                                <th>Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="product-info">
                                            <div className={`product-avatar avatar-${p.img}`}></div>
                                            <div>
                                                <strong>{p.name}</strong>
                                                <p>{p.assignee}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.progress}</td>
                                    <td><span className={`badge ${p.badgeClass}`}>{p.priority}</span></td>
                                    <td>{p.budget}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="activity-section">
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
            </div>

            <div className="blog-section">
                <h2>Latest Articles</h2>
                <div className="blog-cards">
                    {[{
                        id: 1,
                        image: bg1,
                        tag: 'Social',
                        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
                        avatar: 'https://i.pravatar.cc/40?img=1',
                        views: 9125,
                        comments: 9125,
                        date: 'Mon, Dec 19'
                    },
                    {
                        id: 2,
                        image: bg2,
                        tag: 'Gadget',
                        title: 'Intel loses bid to revive antitrust case against patent foe Fortress',
                        avatar: 'https://i.pravatar.cc/40?img=2',
                        views: 4150,
                        comments: 4150,
                        date: 'Sun, Dec 18'
                    },
                    {
                        id: 3,
                        image: bg3,
                        tag: 'Health',
                        title: 'COVID outbreak deepens as more lockdowns loom in China',
                        avatar: 'https://i.pravatar.cc/40?img=3',
                        views: 9480,
                        comments: 9480,
                        date: 'Sat, Dec 17'
                    }].map(post => (
                        <div className="blog-card" key={post.id}>
                            <div className="blog-img" style={{ backgroundImage: `url(${post.image})` }}>
                                <span className="read-time">2 min Read</span>
                                <img className="avatar" src={post.avatar} alt="author" />
                            </div>
                            <div className="blog-body">
                                <span className="tag">{post.tag}</span>
                                <h4>{post.title}</h4>
                                <div className="meta">
                                    <span>👁️ {post.views}</span>
                                    <span>💬 {post.comments}</span>
                                    <span>📅 {post.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    const renderNotificationsPage = () => (
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

    return (
        <div className="dashboard">
            <div className="menu-icon" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <aside className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
                <nav>
                    <p className="section">HOME</p>
                    <button className={`nav-button ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>
                        <img src={dashboardIcon} alt="Dashboard" className="icon" />
                        Dashboard
                    </button>

                    <p className="section">UTILITIES</p>
                    <ul>
                        <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => setActivePage('notifications')}>
                            <img src={notificationIcon} alt="Notifications" className="icon" /> Notifications
                        </li>
                        <li><img src={applicationIcon} alt="Application" className="icon" /> Application</li>
                        <li><img src={appointmentIcon} alt="Appointment" className="icon" /> Appointment</li>
                    </ul>

                    <p className="section">AUTH</p>
                    <ul>
                        <li><img src={logoutIcon} alt="Logout" className="icon" /> Logout</li>
                    </ul>
                </nav>
            </aside>

            <main className="main">
                {activePage === 'dashboard' ? renderDashboard() : renderNotificationsPage()}
            </main>
        </div>
    );
};

export default StudentDashboard;
