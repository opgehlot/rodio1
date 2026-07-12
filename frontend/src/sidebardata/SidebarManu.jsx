import {
  LayoutDashboard,
  Users,
  Truck,
  UserCheck,
  Package,
  CreditCard,
  MapPinned,
  Settings,
} from "lucide-react";

const sidebarMenu = [
  {
    title: "Profile",
    icon: LayoutDashboard,
    path: "/dashborardlayout/profile",
  },

  {
    title: "logout",
    icon: Users,
    path: "/dashboard/customers",
  },

  {
    title: "request",
    icon: Truck,
    path: "/dashboard/transporters",
  },

 

  {
    title: "Bookings",
    icon: Package,
    path: "/dashboard/bookings",
  },

  {
    title: "Payments",
    icon: CreditCard,
    path: "/dashboard/payments",
  },

 

  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default sidebarMenu;