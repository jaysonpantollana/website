import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
