// import axios from "axios";

// const API = axios.create({
//   // https://rodio-tradelink.onrender.com
//   baseURL: "https://rodio-tradelink.onrender.com/api",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;   

import axios from "axios";

const API = axios.create({
  // https://rodio-tradelink.onrender.com
  baseURL: "https://rodio-tradelink.onrender.com/api",
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.exp && payload.exp * 1000 <= Date.now()) {
        logout();
        return Promise.reject(new axios.CanceledError("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      if (error instanceof axios.CanceledError) {
        return Promise.reject(error);
      }

      logout();
      return Promise.reject(error);
    }
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      localStorage.getItem("token")
    ) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default API;
