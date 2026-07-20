import BrokerDashboard from "./broker/BrokerDashboard";
import TranspoterDashboard from "./transporter/TranspoterDashboard";

import UserDashboard from "./user/UserDashboard";



export function MyDashboard() {
  const role = localStorage.getItem("role");

  if (role === "user") {
    return <UserDashboard />;
  }

  if (role === "transporter") {     
    return <TranspoterDashboard/>;
  }

  if (role === "broker") {
    return <BrokerDashboard />;
  }

  return <Navigate to="/login" replace />;
}
export default  MyDashboard;