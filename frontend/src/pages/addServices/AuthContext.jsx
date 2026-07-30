import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  // ==========================
  // USER
  // ==========================
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });


  // ==========================
  // REGISTER DATA
  // ==========================
  const [registerData, setRegisterData] = useState(() => {
    const data = localStorage.getItem("registerData");
    return data ? JSON.parse(data) : null;
  });


  // ==========================
  // BUSINESS
  // ==========================
  const [business, setBusiness] = useState(() => {
    const data = localStorage.getItem("business");
    return data ? JSON.parse(data) : null;
  });


  // ==========================
  // LOGIN CHECK
  // ==========================
  const isLoggedIn = !!user;



  // ==========================
  // USER STORAGE
  // ==========================
  useEffect(() => {

    if(user){
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }
    else{
      localStorage.removeItem("user");
    }

  },[user]);



  // ==========================
  // REGISTER DATA STORAGE
  // ==========================
  useEffect(()=>{

    if(registerData){

      localStorage.setItem(
        "registerData",
        JSON.stringify(registerData)
      );

    }
    else{

      localStorage.removeItem("registerData");

    }

  },[registerData]);



  // ==========================
  // BUSINESS STORAGE
  // ==========================
  useEffect(()=>{

    if(business){

      localStorage.setItem(
        "business",
        JSON.stringify(business)
      );

    }
    else{

      localStorage.removeItem("business");

    }

  },[business]);



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



  return (

    <AuthContext.Provider
      value={{

        user,
        setUser,


        // LOGIN STATUS
        isLoggedIn,


        // REGISTER FORM DATA
        registerData,
        setRegisterData,


        // BUSINESS DATA
        business,
        setBusiness,


        logout,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}