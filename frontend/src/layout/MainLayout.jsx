import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <AppFooter />
    </>
  );
}