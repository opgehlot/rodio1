import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const [business, setBusiness] = useState(() => {
    const data = localStorage.getItem("business");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (business) {
      localStorage.setItem("business", JSON.stringify(business));
    } else {
      localStorage.removeItem("business");
    }
  }, [business]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        business,
        setBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}