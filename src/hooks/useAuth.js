import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lifeflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: 1, name: 'John Doe', email, role: 'donor' };
        localStorage.setItem('lifeflow_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('lifeflow_user');
    setUser(null);
  };

  const register = async (userData) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...userData, id: Date.now(), role: 'donor' };
        localStorage.setItem('lifeflow_user', JSON.stringify(newUser));
        setUser(newUser);
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  return { user, loading, login, logout, register };
};