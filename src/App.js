import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Login from './auth/Login';
import Client from './pages/Client';
import PrivateRoutes from './auth/PrivateRoutes';
import StudentDashboard from './pages/student/StudentDashboard';
import NotificationsPage from './pages/student/NotificationsPage';
import DashboardHome from './pages/student/DashboardHome';
import Inscription from './auth/Inscription';
import ApplicationPage from './pages/student/ApplicationPage'; // ✅ Make sure this is imported
import AppointmentPage from './pages/student/AppointmentPage'; // ✅ Make sure this is imported
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointmentPage from './pages/admin/AdminAppointmentPage';
import AdminApplicationPage from './pages/admin/AdminApplicationPage';
import AdminNotifications from './pages/admin/AdminNotifications';


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

        <Route path="/client" element={
          <PrivateRoutes>
            <Client />
          </PrivateRoutes>
        } />

        {/* Student Dashboard nested routes */}
        <Route path="/studentDashboard" element={<StudentDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="application" element={<ApplicationPage />} /> 
          <Route path="appointment" element={<AppointmentPage />} /> 

        </Route>

        {/* Admin Dashboard nested routes */}
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
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
