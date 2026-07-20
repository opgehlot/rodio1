import { Navigate } from "react-router-dom";

import BrokerDashboard from "./broker/BrokerDashboard";
import TranspoterDashboard from "./transporter/TranspoterDashboard";
import UserDashboard from "./user/UserDashboard";

export default function MyDashboard() {
  const role = localStorage.getItem("role");

  // Agar login nahi hai
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // User Dashboard
  if (role === "user") {
    return <UserDashboard />;
  }

  // Transporter Dashboard
  if (role === "transporter") {
    return <TranspoterDashboard />;
  }

  // Broker Dashboard
  if (role === "broker") {
    return <BrokerDashboard />;
  }

  // Invalid role
  return <Navigate to="/login" replace />;
}