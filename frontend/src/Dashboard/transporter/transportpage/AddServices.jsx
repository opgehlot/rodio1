import React, { useState } from "react";
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  Globe,
  Upload,
} from "lucide-react";
import API from "../../../api/api";
import { useNavigate } from "react-router-dom";

export function AddServices() {
  
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    firmName: "",
    ownerName: "",
    from: "",
    to: "",
    vehicleTypes: [],
    address: "",
    currentState: "",
    currentCity: "",
    pincode: "",
    phoneNumber: "",
    alternatePhone: "",
    businessId: "",
    email: "",
    website: "",
    socialMedia: "",
    acceptedTerms: false,

    photo: null,
    aadhaar: null,
    panCard: null,
    gumasta: null,
    gstCertificate: null,
  });

  const categories = [
    "Transporter",
    "Broker",
    "Fleet Owner",
    "Truck Owner",
    "Logistics Company",
    "Warehouse",
    "Courier",
    "Packing & Moving",
    "Commission Agent",
    "RTO Agent",
    "Finance Agent",
    "Others",
  ];

  const vehicleOptions = [
    "Mini Truck",
    "Pickup",
    "Tata Ace",
    "Bolero Pickup",
    "Eicher",
    "Truck",
    "Container",
    "Trailer",
    "Open Body Truck",
    "Closed Body Truck",
    "Tanker",
    "Tipper",
    "LCV",
    "HCV",
    "Tempo",
    "Canter",
    "Mahindra Jeeto",
    "Ashok Leyland Dost",
    "Tractor Trolley",
    "Refrigerated Truck",
  ];
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "acceptedTerms") {
        setFormData({
          ...formData,
          acceptedTerms: checked,
        });
      } else {
        const updated = checked
          ? [...formData.vehicleTypes, value]
          : formData.vehicleTypes.filter((v) => v !== value);

        setFormData({
          ...formData,
          vehicleTypes: updated,
        });
      }

      return;
    }

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const token = localStorage.getItem("token");


const handleSubmit = (e) => {
  e.preventDefault();

  // Terms validation
  if (!formData.acceptedTerms) {
    alert("Please accept Terms & Conditions");
    return;
  }

  // Required field validation
  if (
    !formData.category ||
    !formData.firmName ||
    !formData.ownerName ||
    !formData.phoneNumber
  ) {
    alert("Please fill all required fields.");
    return;
  }

  // Go to Business Plans page
  navigate("/business-plans", {
    state: {
      formData,
    },
  });
};

     

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Business Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Join Rodio Business Directory and grow your transport business.
          </p>
        </div>

        {/* Progress Bar */}

        <div className="bg-white rounded-2xl shadow-sm border mt-6 p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Step {step} / 5</h2>

            <span className="text-orange-500 font-bold">{step * 20}%</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${step * 20}%`,
              }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          {/* ================= STEP 1 ================= */}

          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Building2 />
                Business Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full mt-2 h-12 border rounded-xl px-4"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium">Firm Name</label>

                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Owner Name</label>

                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Business ID</label>

                  <input
                    type="text"
                    name="businessId"
                    value={formData.businessId}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 2 ================= */}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <MapPin />
                Business Address
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="font-medium">Full Address</label>

                  <textarea
                    rows="4"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                    placeholder="Enter Complete Business Address"
                  />
                </div>

                <div>
                  <label className="font-medium">Current State</label>

                  <input
                    type="text"
                    name="currentState"
                    value={formData.currentState}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Current City</label>

                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 3 ================= */}

          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Truck />
                Transport Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Line From</label>

                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Ex. Indore"
                  />
                </div>

                <div>
                  <label className="font-medium">Line To</label>

                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Ex. Mumbai"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="font-semibold text-lg">Vehicle Types</label>

                <p className="text-gray-500 text-sm mb-4">
                  Select all vehicles you own.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {vehicleOptions.map((vehicle) => (
                    <label
                      key={vehicle}
                      className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
                    >
                      <input
                        type="checkbox"
                        name="vehicleTypes"
                        value={vehicle}
                        checked={formData.vehicleTypes.includes(vehicle)}
                        onChange={handleChange}
                        className="accent-orange-500 w-5 h-5"
                      />

                      <span className="text-sm">{vehicle}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 4 ================= */}

          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Phone />
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Mobile Number</label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div>
                  <label className="font-medium">Alternate Mobile Number</label>

                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Enter Alternate Number"
                  />
                </div>

                <div>
                  <label className="font-medium flex items-center gap-2">
                    <Mail size={18} />
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Enter Email Address"
                  />
                </div>

                <div>
                  <label className="font-medium flex items-center gap-2">
                    <Globe size={18} />
                    Website
                  </label>

                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-medium">Social Media</label>

                  <input
                    type="text"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleChange}
                    className="w-full h-12 border rounded-xl px-4 mt-2"
                    placeholder="Facebook / Instagram / LinkedIn"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 5 ================= */}

          {step === 5 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Upload />
                Upload Documents
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Photo */}

                <div>
                  <label className="block font-medium mb-2">
                    Business Photo
                  </label>

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  {formData.photo && (
                    <p className="text-green-600 text-sm mt-2">
                      {formData.photo.name}
                    </p>
                  )}
                </div>

                {/* Aadhaar */}

                <div>
                  <label className="block font-medium mb-2">Aadhaar Card</label>

                  <input
                    type="file"
                    name="aadhaar"
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  {formData.aadhaar && (
                    <p className="text-green-600 text-sm mt-2">
                      {formData.aadhaar.name}
                    </p>
                  )}
                </div>

                {/* PAN */}

                <div>
                  <label className="block font-medium mb-2">PAN Card</label>

                  <input
                    type="file"
                    name="panCard"
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  {formData.panCard && (
                    <p className="text-green-600 text-sm mt-2">
                      {formData.panCard.name}
                    </p>
                  )}
                </div>

                {/* Gumasta */}

                <div>
                  <label className="block font-medium mb-2">
                    Gumasta License
                  </label>

                  <input
                    type="file"
                    name="gumasta"
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  {formData.gumasta && (
                    <p className="text-green-600 text-sm mt-2">
                      {formData.gumasta.name}
                    </p>
                  )}
                </div>

                {/* GST */}

                <div className="md:col-span-2">
                  <label className="block font-medium mb-2">
                    GST Certificate
                  </label>

                  <input
                    type="file"
                    name="gstCertificate"
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  {formData.gstCertificate && (
                    <p className="text-green-600 text-sm mt-2">
                      {formData.gstCertificate.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 6 ================= */}

          {step === 6 && (
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8">Terms & Submit</h2>

              <div className="border rounded-xl p-5 bg-gray-50">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-orange-500"
                  />

                  <span className="text-gray-700 leading-7">
                    I agree to the Terms & Conditions and certify that all
                    information provided is true and correct.
                  </span>
                </label>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
                >
                  ← Previous
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Register Business"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddServices;
