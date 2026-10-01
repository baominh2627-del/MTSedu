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
    const checkSession = () => {
      const sessionUser = getCurrentUser();
      if (sessionUser) {
        setUser(sessionUser);
      }
      setLoading(false);
    };

    checkSession();
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
    firebaseLogoutUser();
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
      {!loading && children}
    </AuthContext.Provider>
  );
}
