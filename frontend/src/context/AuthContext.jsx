import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Token State
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Login Function
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Sync State with LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser,
        setToken,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}