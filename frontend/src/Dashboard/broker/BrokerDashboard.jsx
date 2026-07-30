import React from "react";
import Dashboard from "../../pages/dashboardpage/Dashboard";
import Profile from "../Profile";

function BrokerDashboard() {
  return (
    <>
      <div>
        <Profile />
        <Dashboard />
      </div>
    </>
  );
}

export default BrokerDashboard;
