import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada al iniciar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('shoppanel_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error parseando usuario en localStorage', err);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('shoppanel_user', JSON.stringify(userData));
    localStorage.setItem('shoppanel_token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shoppanel_user');
    localStorage.removeItem('shoppanel_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};