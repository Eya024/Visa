import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Login from './auth/Login';
import Client from './pages/Client';
import PrivateRoutes from './auth/PrivateRoutes';

function App() {
  
  return (
      <Router>
        <Header />
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
        </Routes>
      </Router>
  );
}

export default App;
