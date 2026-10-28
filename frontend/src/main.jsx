import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext";
import "./languages";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BusinessRegistrationProvider } from "./pages/addServices/BusinessRegistrationContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { FeaturedAdsProvider } from "./context/FeaturedAdsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProfileProvider>
       <FeaturedAdsProvider>
    <BusinessRegistrationProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <App />
    </BusinessRegistrationProvider>
    </FeaturedAdsProvider>
      </ProfileProvider>
  </AuthProvider>
);

