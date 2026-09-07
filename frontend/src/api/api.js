import axios from "axios";

const API = axios.create({
  // https://rodio-tradelink.onrender.com
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
