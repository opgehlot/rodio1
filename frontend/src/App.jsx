import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Services from "./pages/Services";
import Directory from "./pages/Directory";
import Contact from "./pages/Contact";
import ProtectedRoute from "./utils/ProtectedRoute";
import Register from "./components/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import BrokerDashboard from "./pages/dashboardpage/BrokerDashboard";
import TransporterDashboard from "./pages/dashboardpage/TransporterDashboard";
import UserDashboard from "./pages/dashboardpage/UserDashboard";
import SearchBar from "./Dashboard/user/SearchBar";
import Directorydata from "./Dashboard/user/Directory/Directorydata";
import Navbar from "./components/Navbar";
import AppFooter from "./components/AppFooter";
import QueryForm from "./components/QueryForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
import MyBusiness from "./Dashboard/transporter/MyBusiness";
import Leads from "./Dashboard/transporter/Leads";
import MyVehicles from "./Dashboard/transporter/MyVehicles";
import TransportServices from "./Dashboard/transporter/TransportServices";
import PrivaceyPolicy from "./terms&condition/PrivaceyPolicy";
import ContectUs from "./terms&condition/ContectUs";
import RefundPolicy from "./terms&condition/RefundPolicy";
import TermsConditions from "./terms&condition/TermsConditions";
import MyDashboard from "./Dashboard/MyDashboard";
import { DashboardLayout } from "./Dashboard/DashboardLayout";
import SearchTransport from "./Dashboard/user/SearchTransport";
import Bookings from "./Dashboard/user/Bookings";
import Clients from "./Dashboard/broker/Clients";
import UserForm from "./Dashboard/user/UserForm";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* // it is the dashborard pages  */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MyDashboard />} />

          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          {/* user*/}
          <Route path="searchtransport" element={<SearchTransport />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="directory" element={<Directorydata />} />
             <Route path="searchbar" element={<SearchBar />} />
               <Route path="userform" element={<UserForm/>} />

          {/* Transporter */}
          <Route path="mybusiness" element={<MyBusiness />} />
          <Route path="leads" element={<Leads />} />
          <Route path="myvehicles" element={<MyVehicles />} />
          <Route path="transportservices" element={<TransportServices />} />

          {/* Broker */}
          <Route path="clients" element={<Clients />} />
        </Route>
        {/* its hoome noraml page  */}

        <Route path="/termscondition" element={<TermsConditions />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        <Route path="/contectus" element={<ContectUs />} />
        <Route path="/privaceypolicy" element={<PrivaceyPolicy />} />
      
        <Route path="/" element={<Home />} />
        <Route path="/queryform" element={<QueryForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Services />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/broker-dashboard" element={<BrokerDashboard />} />

          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
