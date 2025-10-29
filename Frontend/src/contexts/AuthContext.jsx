import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'user@example.com', name: 'User' });
    }
    setLoading(false);
  }, []);

  const signin = async (credentials) => {
    localStorage.setItem('token', 'mock-jwt-token');
    setUser({ email: credentials.email, name: 'User' });
    return { user: { email: credentials.email, name: 'User' }, token: 'mock-jwt-token' };
  };

  const signup = async (userData) => {
    localStorage.setItem('token', 'mock-jwt-token');
    setUser({ email: userData.email, name: userData.firstName });
    return { user: { email: userData.email, name: userData.firstName }, token: 'mock-jwt-token' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    loading,
    signin,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
