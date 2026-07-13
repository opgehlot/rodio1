import BrokerDashboard from "./broker/BrokerDashboard";
import TransporterDashboard from "./transporter/TransporterDashboard";
import UserDashboard from "./user/UserDashboard";


export function DashboardHome() {
  const role = localStorage.getItem("role");

  if (role === "user") {
    return <UserDashboard />;
  }

  if (role === "transporter") {
    return <TransporterDashboard />;
  }

  if (role === "broker") {
    return <BrokerDashboard />;
  }

  return <h1>No Dashboard Found</h1>;
}
export default DashboardHome;