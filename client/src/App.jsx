import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CalendarPage from './pages/CalendarPage';
import LLMPlanner from './pages/LLMPlanner';
import ResourceViewer from './pages/ResourceViewer';

// Placeholder components
const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div>
            <h1>Welcome to the Exam Prep Dashboard, {user.name}!</h1>
            <p>You are logged in.</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
const Home = () => <h1>Welcome to the Exam Prep App!</h1>;

// Component to protect routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading User Data...</h1>; 
  }

  // If user is null, redirect them to the login page
  return user ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          {/* Add other protected routes here later (e.g., /calendar) */}
          <Route // <-- New protected route
            path="/calendar" 
            element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            } 
          />
          <Route // <-- New protected route
            path="/planner" 
            element={
              <PrivateRoute>
                <LLMPlanner />
              </PrivateRoute>
            } 
          />
          <Route // <-- New protected route
            path="/resources" 
            element={
              <PrivateRoute>
                <ResourceViewer />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;