import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import UserDashboard from './pages/dashboard/UserDashboard';
import DonationHistory from './pages/donations/DonationHistory';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CaseManagement from './pages/admin/CaseManagement';
import UserManagement from './pages/admin/UserManagement';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cases" element={<CaseManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App