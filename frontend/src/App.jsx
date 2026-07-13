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
import SearchBar from "./components/SearchBar";
import Directorydata from "./pages/Directory/Directorydata";
import UserForm from "./pages/newrequestpage/UserForm";
import Navbar from "./components/Navbar";
import AppFooter from "./components/AppFooter";
import QueryForm from "./components/QueryForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard, { DashboardHome } from "./Dashboard/DashboardHome";
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
import DashboardLayout from "./Dashboard/DashboardLayout";
import MyBusiness from "./Dashboard/transporter/MyBusiness";
import Leads from "./Dashboard/transporter/Leads";
import MyVehicles from "./Dashboard/transporter/MyVehicles";
import TransportServices from "./Dashboard/transporter/TransportServices";
import PrivaceyPolicy from "./terms&condition/PrivaceyPolicy";
import ContectUs from "./terms&condition/ContectUs";
import RefundPolicy from "./terms&condition/RefundPolicy";
import TermsConditions from "./terms&condition/TermsConditions";



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
      <ScrollToTop/>

      <Routes><Route path="/dashboard" element={<DashboardLayout />}>

  <Route index element={<DashboardHome/>} />

  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />

    {/* user*/}
  {/* <Route path="search-transport" element={<SearchTransport />} />
  <Route path="bookings" element={<Bookings />} /> */}

  {/* Transporter */}
  <Route path="mybusiness" element={<MyBusiness/>} />
  <Route path="leads" element={<Leads />} />
  <Route path="myvehicles" element={<MyVehicles />} />
  <Route path="transportservices" element={<TransportServices />} />

  {/* Broker */}
  {/* <Route path="clients" element={<Clients />} /> */}

</Route>
        
        
        <Route path="/termscondition" element={<TermsConditions/>} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        <Route path="/contectus" element={<ContectUs />} />
        <Route path="/privaceypolicy" element={<PrivaceyPolicy />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/queryform" element={<QueryForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/directory" element={<Directorydata />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
         <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Services />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/broker-dashboard" element={<BrokerDashboard />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
       <AppFooter />             
     
    </BrowserRouter>
  );
}

export default App;
