import React, { useEffect, useState } from 'react';
import { checkLoggedIn } from '../../utils/auth';
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bg2.jpg';
import bg3 from '../../assets/images/bg3.jpg';

const DashboardHome = () => {
    const [products, setProducts] = useState([
        {
            img: '1',
            name: 'Application Form',
            description: 'Student Visa Application',
            progress: '0%',
            priority: 'Low',
            lastVisited: new Date().toLocaleDateString(),
            badgeClass: 'low'
        },
        {
            img: '2',
            name: 'Notifications',
            description: 'Latest updates',
            progress: '100%',
            priority: 'Medium',
            badgeClass: 'medium'
        },

        {
            img: '4',
            name: 'Set an Appointment',
            description: 'Book a meeting',
            progress: '100%',
            priority: 'Very High',
            lastVisited: new Date().toLocaleDateString(),
            badgeClass: 'very-high'
        },
        {
            img: '3',
            name: 'Articles to Read',
            description: 'Helpful resources',
            progress: '100%',
            priority: 'High',
            lastVisited: new Date().toLocaleDateString(),
            badgeClass: 'high'
        }
    ]);




    const blogPosts = [
        { id: 1, image: bg1, tag: 'Social', title: 'As yen tumbles, gadget-loving Japan...', avatar: 'https://i.pravatar.cc/40?img=1', views: 9125, comments: 9125, date: 'Mon, Dec 19' },
        { id: 2, image: bg2, tag: 'Gadget', title: 'Intel loses bid to revive antitrust...', avatar: 'https://i.pravatar.cc/40?img=2', views: 4150, comments: 4150, date: 'Sun, Dec 18' },
        { id: 3, image: bg3, tag: 'Health', title: 'COVID outbreak deepens in China', avatar: 'https://i.pravatar.cc/40?img=3', views: 9480, comments: 9480, date: 'Sat, Dec 17' },
    ];
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const user = await checkLoggedIn();
            if (user && user.id) {
                try {
                    // Fetch Notifications
                    const notifRes = await fetch(`http://localhost:8000/api/notifications/user/${user.id}/`, {
                        credentials: 'include',
                    });
                    const notifData = await notifRes.json();

                    // Update notification state with recent 6 notifications
                    const recentNotifications = notifData.reverse();
                    setNotifications(recentNotifications.slice(0, 6));

                    // Calculate progress based on seen notifications
                    const total = notifData.length;
                    const seen = notifData.filter(n => n.seen).length;
                    const unread = total - seen;
                    const progress = total > 0 ? Math.round((seen / total) * 100) : 0;

                    // Create description message
                    const description = progress === 100
                        ? "You're up to date with your notifications"
                        : `You have ${unread} notification${unread !== 1 ? 's' : ''} unread`;

                    // Update 'Notifications' card with progress + new description
                    setProducts(prevProducts =>
                        prevProducts.map(product =>
                            product.name === 'Notifications'
                                ? {
                                    ...product,
                                    progress: `${progress}%`,
                                    description,
                                }
                                : product
                        )
                    );
                } catch (error) {
                    console.error('Failed to fetch notifications:', error);
                }

                try {
                    // Fetch Application Progress
                    const appRes = await fetch(`http://localhost:8000/api/applications/user/${user.id}/`, {
                        credentials: 'include',
                    });
                    const appData = await appRes.json();
                    if (appData.exists && appData.data.progress !== undefined) {
                        const progressPercent = appData.data.progress + '%';
                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.name === 'Application Form'
                                    ? { ...product, progress: progressPercent }
                                    : product
                            )
                        );
                    } else {
                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.name === 'Application Form'
                                    ? { ...product, progress: '0%' }
                                    : product
                            )
                        );
                    }
                } catch (error) {
                    console.error('Failed to fetch application progress:', error);
                }
                try {
                    // Fetch Appointment data
                    const appointmentRes = await fetch(`http://localhost:8000/api/appointments/student/${user.id}/`, {
                        credentials: 'include',
                    });
                    const appointmentData = await appointmentRes.json();

                    const hasAppointment = appointmentData && appointmentData.length > 0;
                    const appointmentProgress = hasAppointment ? '100%' : '0%';

                    setProducts(prevProducts =>
                        prevProducts.map(product =>
                            product.name === 'Set an Appointment'
                                ? {
                                    ...product,
                                    progress: appointmentProgress,
                                    description: hasAppointment
                                        ? 'You have an appointment scheduled'
                                        : 'No appointment booked yet',
                                }
                                : product
                        )
                    );
                } catch (error) {
                    console.error('Failed to fetch appointment data:', error);
                }
                try {
                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/Notifications/`, {
                        credentials: 'include',
                    });
                    const visitData = await visitRes.json();

                    if (visitData.last_visited_at) {
                        const formattedDate = new Date(visitData.last_visited_at).toLocaleString();

                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.name === 'Notifications'
                                    ? { ...product, lastVisited: formattedDate }
                                    : product
                            )
                        );
                    }
                } catch (error) {
                    console.error('Failed to fetch last visited time for Notifications:', error);
                }

                try {
                    // Fetch last visited time for AppointmentPage
                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/AppointmentPage/`, {
                        credentials: 'include',
                    });
                    const visitData = await visitRes.json();

                    if (visitData.last_visited_at) {
                        const formattedDate = new Date(visitData.last_visited_at).toLocaleString();

                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.name === 'Set an Appointment'
                                    ? { ...product, lastVisited: formattedDate }
                                    : product
                            )
                        );
                    }
                } catch (error) {
                    console.error('Failed to fetch last visited time for AppointmentPage:', error);
                }
                try {
                    // Fetch last visited time for Application Form
                    const visitRes = await fetch(`http://localhost:8000/api/notifications/last-visit/${user.id}/applicationPage/`, {
                        credentials: 'include',
                    });
                    const visitData = await visitRes.json();

                    if (visitData.last_visited_at) {
                        const formattedDate = new Date(visitData.last_visited_at).toLocaleString();

                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.name === 'Application Form'
                                    ? { ...product, lastVisited: formattedDate }
                                    : product
                            )
                        );
                    }
                } catch (error) {
                    console.error('Failed to fetch last visited time for Application Form:', error);
                }




            }
        };

        fetchData();
    }, []);




    return (
        <>
            <div className="content">
                <div className="revenue-section">
                    <h2>Application Progress</h2>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Steps </th>
                                <th>Progress</th>
                                <th>Priority</th>
                                <th>Last visited at</th>
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
                                                <p>{p.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.progress}</td>
                                    <td><span className={`badge ${p.badgeClass}`}>{p.priority}</span></td>
                                    <td>{p.lastVisited}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="activity-section">
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

            </div>

            <div className="blog-section">
                <h2>Latest Articles</h2>
                <div className="blog-cards">
                    {blogPosts.map(post => (
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
};

export default DashboardHome;
