import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthStatus, logout, login as loginService } from '../services/auth';
import { setAuthToken } from '../services/api';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsLoggedIn(authStatus);
      if (authStatus) {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthToken(token);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await loginService(username, password);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};