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

export  function Addvhicle() {
  const [formData, setFormData] = useState({
    category: "",
    firmName: "",
    ownerName: "",
    linefrom: "",
    lineto: "",
    vehicleTypes: [],
    address: "",
    currentState: "",
    currentCity: "",
    pincode: "",
    phoneNumber: "",
    alternatePhone: "",
    businessId: "",
    referralCode: "",
    referredBy: "",
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.acceptedTerms) {
    alert("Please accept Terms & Conditions");
    return;
  }

  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "vehicleTypes") {
        formData.vehicleTypes.forEach((vehicle) =>
          data.append("vehicleTypes", vehicle)
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    const res = await API.post("/booking/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(res.data.message);

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Something went wrong");
  }

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

        <form
          onSubmit={handleSubmit}
          className="space-y-8 mt-8"
        >

          {/* Business Details */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">

              <Building2 />

              Business Information

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 h-12 border rounded-xl px-4"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="font-medium">
                  Firm Name
                </label>

                <input
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Business ID
                </label>

                <input
                  type="text"
                  name="businessId"
                  value={formData.businessId}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Referral Code
                </label>

                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Referred By
                </label>

                <input
                  type="text"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

            </div>

          </div>
                    {/* Address Details */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">

              <MapPin />

              Business Address

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="md:col-span-2">

                <label className="font-medium">
                  Full Address
                </label>

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

                <label className="font-medium">
                  Current State
                </label>

                <input
                  type="text"
                  name="currentState"
                  value={formData.currentState}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                  placeholder="State"
                />

              </div>

              <div>

                <label className="font-medium">
                  Current City
                </label>

                <input
                  type="text"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                  placeholder="City"
                />

              </div>

              <div>

                <label className="font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                  placeholder="Pincode"
                />

              </div>

            </div>

          </div>

          {/* Transport Details */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">

              <Truck />

              Transport Details

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-medium">
                  Line From
                </label>

                <input
                  type="text"
                  name="linefrom"
                  value={formData.linefrom}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                  placeholder="Ex. Indore"
                />

              </div>

              <div>

                <label className="font-medium">
                  Line To
                </label>

                <input
                  type="text"
                  name="lineto"
                  value={formData.lineto}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                  placeholder="Ex. Mumbai"
                />

              </div>

            </div>

            <div className="mt-8">

              <label className="font-semibold text-lg">
                Vehicle Types
              </label>

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

                    <span className="text-sm">
                      {vehicle}
                    </span>

                  </label>

                ))}

              </div>

            </div>

          </div>
                    {/* Contact Details */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">

              <Phone />

              Contact Information

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="9876543210"
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Alternate Phone
                </label>

                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="Optional"
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div>

                <label className="font-medium">
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

              <div className="md:col-span-2">

                <label className="font-medium">
                  Social Media Link
                </label>

                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  placeholder="Facebook / Instagram / LinkedIn"
                  className="w-full h-12 border rounded-xl px-4 mt-2"
                />

              </div>

            </div>

          </div>

          {/* Upload Documents */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">

              <Upload />

              Upload Documents

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div>
                <label className="font-medium">
                  Business Photo
                </label>

                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">
                  Aadhaar Card
                </label>

                <input
                  type="file"
                  name="aadhaar"
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">
                  PAN Card
                </label>

                <input
                  type="file"
                  name="panCard"
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">
                  Gumasta License
                </label>

                <input
                  type="file"
                  name="gumasta"
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-medium">
                  GST Certificate
                </label>

                <input
                  type="file"
                  name="gstCertificate"
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

            </div>

          </div>
                    {/* Terms & Submit */}

          <div className="bg-white rounded-2xl shadow-sm border p-8">

            <div className="flex items-start gap-3">

              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mt-1 accent-orange-500 w-5 h-5"
              />

              <label className="text-gray-700">
                I agree to the
                <span className="text-orange-500 font-semibold cursor-pointer">
                  {" "}Terms & Conditions
                </span>
                {" "}and certify that all information provided is correct.
              </label>

            </div>

            <div className="flex justify-end mt-8 gap-4">

              <button
                type="reset"
                onClick={() =>
                  setFormData({
                    category: "",
                    firmName: "",
                    ownerName: "",
                    linefrom: "",
                    lineto: "",
                    vehicleTypes: [],
                    address: "",
                    currentState: "",
                    currentCity: "",
                    pincode: "",
                    phoneNumber: "",
                    alternatePhone: "",
                    businessId: "",
                    referralCode: "",
                    referredBy: "",
                    email: "",
                    website: "",
                    socialMedia: "",
                    acceptedTerms: false,
                    photo: null,
                    aadhaar: null,
                    panCard: null,
                    gumasta: null,
                    gstCertificate: null,
                  })
                }
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
              >
                Reset
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-md transition"
              >
                Register Business
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
export default Addvhicle;