
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";


export  function DashboardLayout() {
   const [open, setOpen] = useState(false);

  return (
     <div className="flex h-screen bg-gray-100">
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
      <div className="fixed left-0 top-0 h-screen w-72">
      <Sidebar open={open} setOpen={setOpen} />
      </div>

      {/* Content */}
     <main className="ml-72 flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
export default DashboardLayout;
