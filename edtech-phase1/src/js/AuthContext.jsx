import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as firebaseLoginUser, logoutUser as firebaseLogoutUser, getCurrentUser } from './firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Luôn đảm bảo loading kết thúc dù có lỗi hay không
    try {
      const sessionUser = getCurrentUser();
      if (sessionUser) {
        setUser(sessionUser);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const loggedInUser = await firebaseLoginUser(username, password);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      firebaseLogoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render ngay lập tức, không chờ loading để tránh trang trắng */}
      {children}
    </AuthContext.Provider>
  );
}
