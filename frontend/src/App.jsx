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

      <Routes>
        
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
            path="/transporter-dashboard"
            element={<TransporterDashboard />}
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
       <AppFooter />             
     
    </BrowserRouter>
  );
}

export default App;
