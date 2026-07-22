import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../src/api/api";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  Download,
  Printer,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

const Receipt = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const receiptRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReceipt();
  }, []);

  const fetchReceipt = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/payment/receipt/${paymentId}`
      );
     

      if (data.success) {
        setReceipt(data.receipt);
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to load receipt."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (receipt) {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [receipt, navigate]);


    const downloadPDF = async () => {
    const input = receiptRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${receipt.receiptNumber}.pdf`
    );
  };
    const printReceipt = () => {
    window.print();
  };
    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-semibold">
          Loading Receipt...
        </h2>

      </div>
    );
  }
    if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-red-500">
          {error}
        </h2>

      </div>
    );
  }
    return (

    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-5xl mx-auto">

        {/* Buttons */}

        <div className="flex justify-between mb-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex gap-3">

            <button
              onClick={printReceipt}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </button>

          </div>

        </div>

       <div
  ref={receiptRef}
  data-print
  className="bg-white rounded-2xl shadow-xl overflow-hidden"
>
                {/* Header */}

<div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8">

  <div className="flex justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold tracking-wide">
        RODIO
      </h1>

      <p className="text-blue-100 mt-2">
        Payment Receipt
      </p>

    </div>

    <div className="bg-green-500 flex items-center gap-2 px-5 py-3 rounded-full">

      <CheckCircle size={20} />

      <span className="font-semibold capitalize">
        {receipt.paymentStatus}
      </span>

    </div>

  </div>

</div>

{/* Receipt Information */}

<div className="grid md:grid-cols-3 gap-6 p-8 border-b">

  <div>

    <p className="text-gray-500 text-sm">
      Receipt Number
    </p>

    <h2 className="font-bold text-lg mt-1">
      {receipt.receiptNumber}
    </h2>

  </div>

  <div>

    <p className="text-gray-500 text-sm">
      Payment Date
    </p>

    <h2 className="font-semibold mt-1">
      {new Date(receipt.paymentDate).toLocaleString()}
    </h2>

  </div>

  <div>

    <p className="text-gray-500 text-sm">
      Amount Paid
    </p>

    <h2 className="font-bold text-2xl text-green-600 mt-1">
      ₹ {receipt.amount}
    </h2>

  </div>

</div>

{/* Customer Details */}

<div className="p-8 border-b">

  <h2 className="text-2xl font-bold mb-6">
    Customer Details
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>

      <p className="text-gray-500 text-sm">
        Full Name
      </p>

      <p className="font-semibold text-lg">
        {receipt.customer.name}
      </p>

    </div>

    <div>

      <p className="text-gray-500 text-sm">
        Email Address
      </p>

      <p className="font-semibold">
        {receipt.customer.email}
      </p>

    </div>

    <div>

      <p className="text-gray-500 text-sm">
        Mobile Number
      </p>

      <p className="font-semibold">
        {receipt.customer.mobile}
      </p>

    </div>

    <div>

      <p className="text-gray-500 text-sm">
        User Role
      </p>

      <p className="font-semibold capitalize">
        {receipt.customer.role}
      </p>

    </div>

    <div>

      <p className="text-gray-500 text-sm">
        Customer ID
      </p>

      <p className="font-semibold break-all">
        {receipt.customer.id}
      </p>

    </div>

    <div>

      <p className="text-gray-500 text-sm">
        Referral Code
      </p>

      <p className="font-semibold">
        {receipt.referralCode || "N/A"}
      </p>

    </div>

  </div>

</div>

        {/* Payment Details */}

        <div className="p-8 border-b">

          <h2 className="text-2xl font-bold mb-6">
            Payment Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold break-all">
                {receipt.orderId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment ID</p>
              <p className="font-semibold break-all">
                {receipt.paymentId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold">
                {receipt.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Currency</p>
              <p className="font-semibold">
                {receipt.currency}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-bold text-green-600 text-xl">
                ₹ {receipt.amount}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {receipt.paymentStatus}
              </span>
            </div>

          </div>

        </div>

        {/* Subscription */}

        <div className="p-8 border-b">

          <h2 className="text-2xl font-bold mb-6">
            Subscription Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Subscription Start
              </p>

              <p className="font-semibold">
                {receipt.subscriptionStart
                  ? new Date(
                      receipt.subscriptionStart
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Subscription End
              </p>

              <p className="font-semibold">
                {receipt.subscriptionEnd
                  ? new Date(
                      receipt.subscriptionEnd
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

          </div>

        </div>

       

        {/* Footer */}

        <div className="bg-gray-50 p-8 text-center">

          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful 🎉
          </h2>

          <p className="text-gray-600 mt-3">
            Thank you for choosing
            <span className="font-bold"> RODIO</span>.
          </p>

          <p className="text-gray-500 mt-2">
            This is a computer-generated receipt.
            No signature is required.
          </p>

          <div className="mt-8 border-t pt-5">

            <p className="font-semibold">
              © {new Date().getFullYear()} RODIO
            </p>

            <p className="text-sm text-gray-500 mt-1">
              www.rodio.in
            </p>

            <p className="text-sm text-gray-500">
              support@rodio.in
            </p>

          </div>

        </div>
        </div>

      </div>
      <div className="mt-8 flex justify-center">
  <button
    onClick={() => navigate("/dashboard")}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    Go to Dashboard
  </button>
</div>

    </div>
    




);


};

export default Receipt;

  