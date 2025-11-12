import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';


// Simple protected route: requires currentUser in localStorage
function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
   
        
    
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
