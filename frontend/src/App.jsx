


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import { DashboardLayout } from "./Dashboard/DashboardLayout";

// Main Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./components/Login";
import Register from "./components/Register";
import QueryForm from "./components/QueryForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TermsConditions from "./terms&condition/TermsConditions";
import RefundPolicy from "./terms&condition/RefundPolicy";
import ContectUs from "./terms&condition/ContectUs";
import PrivaceyPolicy from "./terms&condition/PrivaceyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import SearchBar from "./components/TransportSearch";
import UserForm from "./Dashboard/user/UserForm";
import ShowEnquiery from "./Dashboard/user/myrequest/ShowEnquiery";
import TransporterProfile from "./Dashboard/user/TrasporterProfile";
import BidList from "./Dashboard/user/myrequest/BidList";
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
import ChangePassword from "./Dashboard/Changepassword";
import Leads from "./Dashboard/transporter/Leads";
import TransportServices from "./Dashboard/transporter/TransportServices";
import AcceptedBid from "./Dashboard/transporter/AcceptedBid";

import PlanSelection from "../payment/PlanSelection";
import Receipt from "../payment/Receipt";
import AddVehicle from "./pages/dashboardpage/AddVehicle";
import MyVehicles from "./pages/dashboardpage/MyVehicles";
import AddRoute from "./pages/dashboardpage/AddRoute";
import MyRoutes from "./pages/dashboardpage/MyRoutes";
import Dashboard from "./pages/dashboardpage/Dashboard";
import MyDashboard from "./Dashboard/MyDashboard";
import AddServices from "./pages/dashboardpage/AddServices";
import UploadDocuments from "./pages/dashboardpage/UploadDocuments";
import Directory from "./components/Directory";
import WorkingAreas from "./pages/dashboardpage/WorkingArea";
import MyDocuments from "./pages/dashboardpage/Mydocment";
import TransportSearch from "./components/TransportSearch";
import DaynamicHomeComponent from "./components/DaynamicHomeComponent";
import BusServices from "./Dashboard/DashboardPage/BusServices";
import ChaAgent from "./Dashboard/DashboardPage/ChaAgent";
import Courier from "./Dashboard/DashboardPage/Courier";
import FinanceCompany from "./Dashboard/DashboardPage/FinanceCompany";
import Fleetowenr from "./Dashboard/DashboardPage/Fleetowenr";
import RtoAgent from "./Dashboard/DashboardPage/RtoAgent";
import TruckBodyBuilder from "./Dashboard/DashboardPage/TruckBodyBuilder";
import PackersAndMovers from "./Dashboard/DashboardPage/PackersAndMovers";
import FinanceAgent from "./Dashboard/DashboardPage/FinanceAgent";
import CarCarrier from "./Dashboard/DashboardPage/CarCarrier";
import Insurancecompany from "./Dashboard/DashboardPage/Insurancecompany";
import UpadateVehicle from "./components/UpadateVehicle";
import ImageGalleryManager from "./Dashboard/ImageGalleryManager";
import Referral from "../payment/Referral";
import UpdateBisProfile from "./components/UpdateBisProfile";
import ReviewSection from "./Dashboard/ReviewSection";



// Dummy Pages

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
          <Route index element={<MyDashboard />} />
            <Route path="updatevehicle" element={<UpadateVehicle />} />

          {/* Common */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="directory" element={<Directory />} />

          {/* User */}
          <Route path="transportsearch" element={<TransportSearch />} />
          <Route path="searchbar" element={<SearchBar />} />
          <Route path="userform" element={<UserForm />} />
          <Route path="showenquiery" element={<ShowEnquiery />} />
          <Route path="bid-list/:id" element={<BidList />} />
          <Route path="transporters/:id" element={<TransporterProfile />} />
          <Route path="addvehicle" element={<AddVehicle />} />
          <Route path="workingareas" element={<WorkingAreas />} />
          <Route path="myvehicles" element={<MyVehicles />} />
          <Route path="uploaddocuments" element={<UploadDocuments />} />
          <Route path="mydocument" element={<MyDocuments />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="myroutes" element={<MyRoutes />} />
          <Route path="addservices" element={<AddServices />} />
          <Route path="imagegallerymanager" element={<ImageGalleryManager />} />

          {/* Transporter */}

          <Route path="leads" element={<Leads />} />
          <Route path="transportservices" element={<TransportServices />} />
          <Route path="acceptedbid" element={<AcceptedBid />} />
          {/* Broker */}
          
         {/* Payment */}
          <Route path="planselection" element={<PlanSelection />} />
          <Route path="receipt/:paymentId" element={<Receipt />} />

          <Route path="busServices" element={<BusServices />} />
          <Route path="chaAgent" element={<ChaAgent />} />
          <Route path="courier" element={<Courier/>} />
          <Route path="financeCompany" element={<FinanceCompany />} />
          <Route path="fleetowner" element={<Fleetowenr />} />
          <Route path="rtoAgent" element={<RtoAgent />} />
          <Route path="truckBodyBuilder" element={<TruckBodyBuilder />} />
          <Route path="packersAndMovers" element={<PackersAndMovers />} />
          <Route path="financeAgent" element={<FinanceAgent />} />
          <Route path="carcarrier" element={<CarCarrier />} />
          <Route path="insurancecompany" element={<Insurancecompany />} />
          <Route path="referral" element={<Referral/>} />
          <Route path="updatebisprofile" element={<UpdateBisProfile/>} />
          <Route path="reviewsection" element={<ReviewSection/>} />
         
        


          
          
          
        </Route>


        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/daynamichomecomponent"
            element={<DaynamicHomeComponent />}
          />
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
          <Route path="/directory" element={<Directory />} />
          <Route path="/dashboard/leads" element={<Leads />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
