import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear AuthContext
    logout();

    // Clear remaining app data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition duration-200"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}