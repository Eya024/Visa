import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/student/studentDashboard.css';
import notificationIcon from '../../assets/images/logos/notification.png';
import applicationIcon from '../../assets/images/logos/application.png';
import appointmentIcon from '../../assets/images/logos/appointment.png';
import logoutIcon from '../../assets/images/logos/logout.png';
import dashboardIcon from '../../assets/images/logos/dashboard.png';
import logo from '../../assets/images/logo.png';


const StudentDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    const isActive = (path) => location.pathname === path;

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
                    <Link to="/studentDashboard" className={`nav-button ${isActive('/studentDashboard') ? 'active' : ''}`}>
                        <img src={dashboardIcon} alt="Dashboard" className="icon" />
                        Dashboard
                    </Link>

                    <p className="section">UTILITIES</p>
                    <ul>
                        <li className={isActive('/studentDashboard/notifications') ? 'active' : ''}>
                            <Link to="/studentDashboard/notifications">
                                <img src={notificationIcon} alt="Notifications" className="icon" /> Notifications
                            </Link>
                        </li>
                        <li>
                            <img src={applicationIcon} alt="Application" className="icon" /> Application
                        </li>
                        <li>
                            <img src={appointmentIcon} alt="Appointment" className="icon" /> Appointment
                        </li>
                    </ul>

                    <p className="section">AUTH</p>
                    <ul>
                        <li onClick={() => navigate('/login')}>
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

export default StudentDashboard;
