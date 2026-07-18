import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export  function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Mobile Header */}

      <header className="lg:hidden sticky top-0 z-40 bg-white shadow flex items-center justify-between px-5 py-4">

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>

        <h1 className="text-xl font-bold">
          Rodio TradLink
        </h1>

      </header>

      {/* Sidebar */}

      <Sidebar open={open} setOpen={setOpen} />

      {/* Main */}

     <main className="lg:ml-80 p-4 md:p-6 overflow-x-hidden">
  <Outlet />
</main>

    </div>
  );
}
export default DashboardLayout;