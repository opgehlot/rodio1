import { Navigate } from "react-router-dom";

import BrokerDashboard from "./broker/BrokerDashboard";
import TranspoterDashboard from "./transporter/TranspoterDashboard";
import UserDashboard from "./user/UserDashboard";
import Fleetowenr from "./DashboardPage/Fleetowenr";
import ChaAgent from "./DashboardPage/ChaAgent";
import Courier from "./DashboardPage/Courier";
import BusServices from "./DashboardPage/BusServices";
import TravelTaxi from "./DashboardPage/TravelTaxi";
import TruckBodyBuilder from "./DashboardPage/TruckBodyBuilder";
import RtoAgent from "./DashboardPage/RtoAgent";
import FinanceCompany from "./DashboardPage/FinanceCompany";

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
  // if (role === "broker") {
  //   return <BrokerDashboard />;
  // }

  // Fleet Owner Dashboard
  if (role === "fleet_owner") {
    return <Fleetowenr />;
  }

  // CHA Agent Dashboard
  if (role === "cha_agent") {
    return <ChaAgent/>;
  }

  // Courier Dashboard
  if (role === "courier") {
    return <Courier/>;
  }

  // Bus Service Dashboard
  if (role === "bus_service") {
    return <BusServices/>;
  }

  // Travel & Taxi Dashboard
  if (role === "travel_taxi") {
    return <TravelTaxi />;
  }

  // Truck Body Builder Dashboard
  if (role === "truck_body_builder") {
    return <TruckBodyBuilder />;
  }

  // RTO Agent Dashboard
  if (role === "rto_agent") {
    return <RtoAgent />;
  }

  // Finance Company Dashboard
  if (role === "finance_company") {
    return <FinanceCompany/>;
  }

  // Invalid role
  return <Navigate to="/login" replace />;
}