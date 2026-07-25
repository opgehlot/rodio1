import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layout/MainLayout";
import { DashboardLayout } from "./Dashboard/DashboardLayout";

// Main Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./components/Register";
import QueryForm from "./components/QueryForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Terms
import TermsConditions from "./terms&condition/TermsConditions";
import RefundPolicy from "./terms&condition/RefundPolicy";
import ContectUs from "./terms&condition/ContectUs";
import PrivaceyPolicy from "./terms&condition/PrivaceyPolicy";

// Common
import ScrollToTop from "./components/ScrollToTop";

// Dashboard Home
import DashboardHome from "./pages/addServices/DashboardHome";

// User
import SearchTransport from "./Dashboard/user/SearchTransport";
import SearchBar from "./Dashboard/user/SearchBar";
import Directorydata from "./Dashboard/user/Directory/Directorydata";
import UserForm from "./Dashboard/user/UserForm";
import ShowEnquiery from "./Dashboard/user/myrequest/ShowEnquiery";
import TransporterProfile from "./Dashboard/user/TrasporterProfile";
import BidList from "./Dashboard/user/myrequest/BidList";

// Common Dashboard
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
import ChangePassword from "./Dashboard/Changepassword";

// Transporter
import MyBusiness from "./Dashboard/transporter/MyBusiness";
import Leads from "./Dashboard/transporter/Leads";
import MyVehicles from "./Dashboard/transporter/MyVehicles";
import TransportServices from "./Dashboard/transporter/TransportServices";
import AddVehicle from "./Dashboard/transporter/Addvehicle";
import AcceptedBid from "./Dashboard/transporter/AcceptedBid";

// Broker
import Clients from "./Dashboard/broker/Clients";

// Services
import AddServices from "./pages/addServices/AddServices";

// Payment
import PlanSelection from "../payment/PlanSelection";
import Receipt from "../payment/Receipt";

// Dummy Pages
import Dummydirectory from "./pages/Dummydirctory";
import DtransporterDetails from "./pages/DtransporterDetails";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
            padding: "12px 20px",
            textAlign: "center",
          },
        }}
      />

      <ScrollToTop />

      <Routes>

        {/* ================= Dashboard ================= */}

        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* Common */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="changepassword" element={<ChangePassword />} />

          {/* User */}
          <Route path="searchtransport" element={<SearchTransport />} />
          <Route path="directory" element={<Directorydata />} />
          <Route path="searchbar" element={<SearchBar />} />
          <Route path="userform" element={<UserForm />} />
          <Route path="showenquiery" element={<ShowEnquiery />} />
          <Route path="bid-list/:id" element={<BidList />} />
          <Route path="transporter/:id" element={<TransporterProfile />} />

          {/* Transporter */}
          <Route path="mybusiness" element={<MyBusiness />} />
          <Route path="leads" element={<Leads />} />
          <Route path="myvehicles" element={<MyVehicles />} />
          <Route path="transportservices" element={<TransportServices />} />
          <Route path="addvehicle" element={<AddVehicle />} />
          <Route path="addservices" element={<AddServices />} />
          <Route path="acceptedbid" element={<AcceptedBid />} />

          {/* Broker */}
          <Route path="clients" element={<Clients />} />

          {/* Payment */}
          <Route path="planselection" element={<PlanSelection />} />
          <Route path="receipt/:paymentId" element={<Receipt />} />

        </Route>

        {/* ================= Website ================= */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Same Directory without Sidebar */}
          <Route path="/directory" element={<Directorydata />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/queryform" element={<QueryForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Terms */}
          <Route path="/termscondition" element={<TermsConditions />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/contectus" element={<ContectUs />} />
          <Route path="/privaceypolicy" element={<PrivaceyPolicy />} />

          {/* Dummy */}
          <Route path="/dummydirctory" element={<Dummydirectory />} />
          <Route
            path="/DtransporterDetails"
            element={<DtransporterDetails />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;