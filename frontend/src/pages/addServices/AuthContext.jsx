import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ==========================
  // USER
  // ==========================
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // ==========================
  // REGISTER DATA
  // ==========================
  const [registerData, setRegisterData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("registerData")) || null;
    } catch {
      return null;
    }
  });

  // ==========================
  // BUSINESS
  // ==========================
  const [business, setBusiness] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("business")) || null;
    } catch {
      return null;
    }
  });

  // ==========================
  // LOGIN STATUS
  // ==========================
  const isLoggedIn = Boolean(user);

  // ==========================
  // USER STORAGE
  // ==========================
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ==========================
  // REGISTER DATA STORAGE
  // ==========================
  useEffect(() => {
    if (registerData) {
      localStorage.setItem(
        "registerData",
        JSON.stringify(registerData)
      );
    } else {
      localStorage.removeItem("registerData");
    }
  }, [registerData]);

  // ==========================
  // BUSINESS STORAGE
  // ==========================
  useEffect(() => {
    if (business) {
      localStorage.setItem(
        "business",
        JSON.stringify(business)
      );
    } else {
      localStorage.removeItem("business");
    }
  }, [business]);

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    setUser(null);
    setRegisterData(null);
    setBusiness(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("registerData");
    localStorage.removeItem("business");
  };

  const value = {
    user,
    setUser,

    registerData,
    setRegisterData,

    business,
    setBusiness,

    isLoggedIn,

    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}