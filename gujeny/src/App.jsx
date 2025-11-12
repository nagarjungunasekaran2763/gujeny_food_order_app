import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import HotelRegistration from './pages/HotelRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Protect routes if not logged in
function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* 🔹 Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* 🔹 Hotel Registration Page */}
      <Route path="/hotel-registration" element={<HotelRegistration />} />

      {/* 🔹 Home (Protected Page) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 🔹 Redirect all other paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
