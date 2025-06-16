// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Login from './auth/Login';
import Client from './pages/Client';
import StudentDashboard from './pages/student/StudentDashboard';
import NotificationsPage from './pages/student/NotificationsPage';
import DashboardHome from './pages/student/DashboardHome';
import DashboardHomeAdmin from './pages/admin/DashboardHomeAdmin';
import Inscription from './auth/Inscription';
import ApplicationPage from './pages/student/ApplicationPage';
import AppointmentPage from './pages/student/AppointmentPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointmentPage from './pages/admin/AdminAppointmentPage';
import AdminApplicationPage from './pages/admin/AdminApplicationPage';
import AdminNotifications from './pages/admin/AdminNotifications';
import { checkLoggedIn } from './utils/auth';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children, allowedRole }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const userData = await checkLoggedIn();
      setUser(userData);
      setLoading(false);

      if (!userData) {
        // If not logged in, redirect to login
        navigate('/login', { state: { from: location.pathname } });
      } else if (userData.role !== allowedRole) {
        // If role doesn't match, redirect to appropriate dashboard
        const redirectTo = userData.role === 'admin' ? '/adminDashboard' : '/studentDashboard';
        navigate(redirectTo);
      }
    };
    verifyUser();
  }, [navigate, location.pathname, allowedRole]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner
  }

  return user && user.role === allowedRole ? children : null;
}

function AppWrapper() {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.startsWith('/studentDashboard') ||
    location.pathname.startsWith('/adminDashboard') ||
    location.pathname === '/login' ||
    location.pathname === '/inscription';

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />

        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRole={null}>
              <Client />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard nested routes */}
        <Route
          path="/studentDashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="application" element={<ApplicationPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
        </Route>

        {/* Admin Dashboard nested routes */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomeAdmin />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="application" element={<AdminApplicationPage />} />
          <Route path="appointment" element={<AdminAppointmentPage />} />
        </Route>
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;