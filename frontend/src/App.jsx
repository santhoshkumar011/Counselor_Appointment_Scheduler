// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CounselorInterface from './pages/CounselorInterface.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/counselor-dashboard" element={<CounselorInterface />} />
    </Routes>
  );
}

export default App;
