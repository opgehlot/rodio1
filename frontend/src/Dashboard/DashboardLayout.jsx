import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-72 h-screen z-50">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 min-h-screen overflow-y-auto p-6">
        <Outlet />
      </main>

    </div>
  );
}
export default DashboardLayout;