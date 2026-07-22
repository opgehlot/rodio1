import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BusinessRegistrationProvider } from "./pages/addServices/BusinessRegistrationContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BusinessRegistrationProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <App />
    </BusinessRegistrationProvider>
  </AuthProvider>
);