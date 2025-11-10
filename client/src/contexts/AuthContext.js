import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../api/auth';

const AuthContext = createContext();

// Hook for easy access to auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Check local storage for a user upon initial load
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  // State to track loading status (useful for initial check)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login({ email, password });
      setUser(userData);
      return userData;
    } catch (err) {
      // Axios wraps the backend error, get the custom message
      const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      setError(message);
      throw new Error(message); // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  };

  // Register function (similar error handling applies)
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.register({ name, email, password });
      setUser(userData);
      return userData;
    } catch (err) {
      const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};