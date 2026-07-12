import { NavLink } from "react-router-dom";
import sidebarMenu from "../sidebardata/SidebarManu";

export function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white h-screen sticky top-0">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          Rodio
        </h1>

      </div>

      <nav className="p-4 space-y-2">

        {sidebarMenu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}
export default Sidebar;