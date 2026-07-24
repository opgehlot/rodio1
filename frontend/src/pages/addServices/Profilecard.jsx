import { useEffect, useState } from "react";
import API from "../../api/api";

import AddServices from "../addServices/AddServices";
import SubscriptionCard from "./SubscriptionCard";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const res = await API.get("/dashboard");

      if (res.data.success) {
        setBusiness(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // Business Profile Not Completed
  if (!business?.profileCompleted) {
    return <AddServices />;
  }

  // Subscription Not Active
  if (business.subscriptionStatus === "Free") {
    return <SubscriptionCard business={business} />;
  }

  // Dashboard
  return <DashboardHome business={business} />;
};

export default Dashboard;