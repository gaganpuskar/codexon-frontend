import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. LIFECYCLE RECOVERY LAYER: Page reload hote hi dynamic data fetch karega
  useEffect(() => {
    const storedUser = localStorage.getItem('pushkar_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Session parse allocation error sequence, wiping cache.");
        localStorage.removeItem('pushkar_user');
      }
    }
    setLoading(false);
  }, []);

  // 2. LIVE LOGIN HANDSHAKE LAYER: Database tokens ko client memory me bind karega
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('pushkar_user', JSON.stringify(userData)); // Local browser cluster save
  };

  // 3. LOGOUT & PROFILE DESTRUCTION MATRIX
  const logout = () => {
    setUser(null);
    localStorage.removeItem('pushkar_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};