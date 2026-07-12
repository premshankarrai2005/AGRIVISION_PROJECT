import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

export const farmerSidebarItems = [
  {
    title: "Dashboard",
    path: "/farmer",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/farmer/products",
    icon: Package,
  },
  {
    title: "Orders",
    path: "/farmer/orders",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    path: "/farmer/profile",
    icon: User,
  },
];

export const farmerLogoutItem = {
  title: "Logout",
  icon: LogOut,
};