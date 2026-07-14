
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";


export  function DashboardLayout() {
   const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow lg:hidden flex items-center justify-between px-4 z-50">
        <h2 className="text-xl font-bold text-blue-700">
          Dashboard
        </h2>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content */}
      <main className="flex-1 p-5 lg:p-8 pt-20 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
export default DashboardLayout;
