// src/components/ReceiptModal.jsx

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, CheckCircle, X } from "lucide-react";

export function ReceiptModal({ receipt, onClose }) {
  const receiptRef = useRef(null);

  if (!receipt) return null;

  const downloadPDF = async () => {
    const input = receiptRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${receipt.receiptNumber || "receipt"}.pdf`);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        
        {/* Modal Top Bar / Actions */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
          <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">
            PAYMENT RECEIPT
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={printReceipt}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition"
            >
              <Printer size={15} /> Print
            </button>
            <button
              onClick={downloadPDF}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition shadow-sm"
            >
              <Download size={15} /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-xl transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="p-6 md:p-8">
          <div ref={receiptRef} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-6 md:p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black tracking-wide">RODIO</h1>
                  <p className="text-blue-100 mt-1 text-xs font-bold uppercase tracking-widest">Payment Receipt</p>
                </div>
                <div className="bg-emerald-500 flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-sm">
                  <CheckCircle size={18} />
                  <span className="font-black text-xs uppercase tracking-wider">{receipt.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Receipt Summary Grid */}
            <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8 border-b border-slate-100">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Receipt Number</p>
                <h2 className="font-black text-slate-900 text-base mt-1">{receipt.receiptNumber}</h2>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Payment Date</p>
                <h2 className="font-bold text-slate-800 text-sm mt-1">
                  {receipt.paymentDate ? new Date(receipt.paymentDate).toLocaleString() : "N/A"}
                </h2>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Amount Paid</p>
                <h2 className="font-black text-2xl text-emerald-600 mt-1">₹ {receipt.amount}</h2>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-5">Customer Details</h2>
              <div className="grid md:grid-cols-2 gap-5 text-sm">
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Full Name</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.customer?.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Email Address</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.customer?.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Mobile Number</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.customer?.mobile}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">User Role</p>
                  <p className="font-bold text-slate-800 mt-0.5 capitalize">{receipt.customer?.role}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Customer ID</p>
                  <p className="font-mono text-xs font-bold text-slate-700 mt-0.5 break-all">{receipt.customer?.id}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Referral Code</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.referralCode || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Payment & Subscription info */}
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-5">Payment & Subscription</h2>
              <div className="grid md:grid-cols-2 gap-5 text-sm">
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Order ID</p>
                  <p className="font-mono text-xs font-bold text-slate-700 mt-0.5 break-all">{receipt.orderId}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Payment ID</p>
                  <p className="font-mono text-xs font-bold text-slate-700 mt-0.5 break-all">{receipt.paymentId}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Payment Method</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Currency</p>
                  <p className="font-bold text-slate-800 mt-0.5">{receipt.currency}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Subscription Start</p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {receipt.subscriptionStart ? new Date(receipt.subscriptionStart).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Subscription End</p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {receipt.subscriptionEnd ? new Date(receipt.subscriptionEnd).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-6 text-center text-xs">
              <h3 className="font-black text-emerald-600 text-sm uppercase">Payment Successful 🎉</h3>
              <p className="text-slate-500 font-bold mt-1 uppercase tracking-wider">Thank you for choosing RODIO.</p>
              <p className="text-slate-400 mt-0.5">This is a computer-generated receipt. No signature is required.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ReceiptModal;