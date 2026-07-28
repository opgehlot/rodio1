import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Map,
  Navigation,
  Hash,
  ArrowRight,
  Loader2,
  ShieldCheck,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

// ======================================================
// BUSINESS CATEGORIES
// ======================================================

const BUSINESS_CATEGORIES = [
  "Transporter",
  "Broker",
  "Fleet Owner",
  "Truck Owner",
  "Logistics Company",
  "Warehouse",
  "Courier",
  "Packers & Movers",
  "RTO Agent",
  "Finance Agent",
  "Other",
];

export function AddServices() {
  const navigate = useNavigate();

  // ======================================================
  // AUTH CONTEXT
  // ======================================================
  const { user, registerData } = useContext(AuthContext);

  const mobile =
    user?.mobile ||
    user?.phoneNumber ||
    registerData?.mobile ||
    registerData?.phoneNumber ||
    "";

  // ======================================================
  // STATE
  // ======================================================

  const [loading, setLoading] = useState(false);
  const [fetchingDraft, setFetchingDraft] = useState(true);

  const [formData, setFormData] = useState({
    category: "",
    name: user?.name || registerData?.name || "",
    email: user?.email || registerData?.email || "",
    firmName: "",
    address: "",
    currentCity: "",
    currentState: "",
    pincode: "",
  });

  // ======================================================
  // LOAD OLD BUSINESS DRAFT & AUTO-FILL USER/REGISTER DATA
  // ======================================================

  useEffect(() => {
    const loadDraft = async () => {
      try {
        const { data } = await API.get("/business/me");
        const business = data?.data;

        if (business) {
          if (
            business.registrationStatus === "completed" &&
            business.subscriptionStatus === "active" &&
            business.profileUnlocked === true
          ) {
            navigate("/dashboard", {
              replace: true,
            });
            return;
          }

          setFormData((prev) => ({
            ...prev,
            category: business.category || prev.category,
            name:
              business.name ||
              user?.name ||
              registerData?.name ||
              "",
            email:
              business.email ||
              user?.email ||
              registerData?.email ||
              "",
            firmName: business.firmName || prev.firmName,
            address: business.address || prev.address,
            currentCity: business.currentCity || prev.currentCity,
            currentState: business.currentState || prev.currentState,
            pincode: business.pincode || prev.pincode,
          }));
        }
      } catch (error) {
        if (error?.response?.status !== 404) {
          console.error("LOAD BUSINESS ERROR:", error);
        }
      } finally {
        setFetchingDraft(false);
      }
    };

    loadDraft();
  }, [navigate, user, registerData]);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // HANDLE PINCODE
  // ======================================================

  const handlePincode = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      pincode: value,
    }));
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateForm = () => {
    if (!mobile) {
      toast.error("Registered mobile number not found. Please login again.");
      return false;
    }
    if (!formData.category) {
      toast.error("Please select a business category");
      return false;
    }
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (
      formData.email.trim() &&
      !/^\S+@\S+\.\S+$/.test(formData.email.trim())
    ) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!formData.firmName.trim()) {
      toast.error("Firm name is required");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.currentCity.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!formData.currentState.trim()) {
      toast.error("State is required");
      return false;
    }
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      toast.error("Enter valid 6 digit pincode");
      return false;
    }
    return true;
  };

  // ======================================================
  // SAVE BUSINESS DRAFT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        category: formData.category,
        name: formData.name.trim(),
        email: formData.email.trim(),
        firmName: formData.firmName.trim(),
        address: formData.address.trim(),
        currentCity: formData.currentCity.trim(),
        currentState: formData.currentState.trim(),
        pincode: formData.pincode.trim(),
        phoneNumber: mobile,
      };

      const { data } = await API.post("/business/create", payload);

      if (data?.data?.businessId) {
        localStorage.setItem("businessId", data.data.businessId);
      }

      toast.success(data?.message || "Business details saved");
      navigate("/dashboard/planselection");
    } catch (error) {
      console.error("SAVE DRAFT ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Unable to save business details"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // INITIAL LOADING
  // ======================================================

  if (fetchingDraft) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={36} />
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-white to-orange-50/40 px-4 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BADGE & TITLE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold tracking-wide mb-3 shadow-sm">
            <Sparkles size={14} />
            <span>Business Setup Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Register Your Business
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg mx-auto">
            Provide your establishment credentials to unlock premium network features.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-950/5 overflow-hidden transition-all max-w-3xl mx-auto"
        >
          {/* HEADER BAR */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-6 sm:px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                <Building2 size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Business Information
                </h2>
                <p className="text-orange-100 text-xs sm:text-sm mt-0.5">
                  Fill in your official corporate details below.
                </p>
              </div>
            </div>
          </div>

          {/* FORM BODY */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* REGISTERED MOBILE */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Registered Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={mobile}
                    readOnly
                    tabIndex={-1}
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 text-gray-600 pl-11 pr-4 outline-none cursor-not-allowed font-medium text-sm"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                  * Tied securely to your authenticated session.
                </p>
              </div>

              {/* BUSINESS CATEGORY */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Business Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BriefcaseBusiness size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-12 rounded-2xl border border-gray-200 bg-white pl-11 pr-10 outline-none cursor-pointer focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {BUSINESS_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* FIRM NAME */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Firm / Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    placeholder="e.g. Balaji Roadlines"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* BUSINESS ADDRESS */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter street, landmark, or area details"
                    className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* CITY */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* STATE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Map size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="currentState"
                    value={formData.currentState}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* PINCODE */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handlePincode}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="6-digit postal code"
                    className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium transition-all text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT SECURITY BANNER */}
            <div className="bg-orange-50/70 border border-orange-200/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
              <div className="p-2 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Complete Verification & Payment
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Your inputs will be stored as a secure draft. Final step involves completing the activation payment.
                </p>
              </div>
            </div>

            {/* ACTION SUBMIT BUTTON */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-[260px] h-12 px-8 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 hover:from-orange-500 hover:to-orange-600 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving Details...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Continue to Payment</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServices;