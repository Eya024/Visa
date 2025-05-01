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


function AppWrapper() {
  const location = useLocation();

  // Only show header/footer if NOT on a /studentDashboard route
  const hideHeaderFooter = location.pathname.startsWith('/studentDashboard');

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
        <Route path="/client" element={
          <PrivateRoutes>
            <Client />
          </PrivateRoutes>
        } />
        <Route path="/studentDashboard" element={<StudentDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="notifications" element={<NotificationsPage />} />
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
