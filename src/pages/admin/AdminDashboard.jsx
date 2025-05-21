import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/admin/adminDashboard.css';
import notificationIcon from '../../assets/images/logos/notification.png';
import applicationIcon from '../../assets/images/logos/application.png';
import appointmentIcon from '../../assets/images/logos/appointment.png';
import logoutIcon from '../../assets/images/logos/logout.png';
import dashboardIcon from '../../assets/images/logos/dashboard.png';
import logo from '../../assets/images/logo.png';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const AdminDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'false');
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="dashboard">
            <div className="menu-icon" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <aside className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
                <div className="sidebar-logo">
                    <Link to="/home">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <nav>
                    <p className="section">HOME</p>
                    <Link to="/adminDashboard" className={`nav-button ${isActive('/adminDashboard') ? 'active' : ''}`}>
                        <img src={dashboardIcon} alt="Dashboard" className="icon" />
                        Dashboard
                    </Link>

                    <p className="section">UTILITIES</p>
                    <ul>
                        <li className={isActive('/adminDashboard/notifications') ? 'active' : ''}>
                            <Link to="/adminDashboard/notifications">
                                <img src={notificationIcon} alt="Notifications" className="icon" /> Notifications
                            </Link>
                        </li>
                        <li className={isActive('/adminDashboard/application') ? 'active' : ''}>
                            <Link to="/adminDashboard/application">
                                <img src={applicationIcon} alt="Application" className="icon" /> Applications Forms
                            </Link>
                        </li>
                        <li className={isActive('/adminDashboard/appointment') ? 'active' : ''}>
                            <Link to="/adminDashboard/appointment">
                                <img src={appointmentIcon} alt="Appointment" className="icon" /> Appointment Requests
                            </Link>
                        </li>
                    </ul>

                    <p className="section">AUTH</p>
                    <ul>
                        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <img src={logoutIcon} alt="Logout" className="icon" /> Logout
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
