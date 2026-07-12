import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  UserCog,
  LogOut,
} from "lucide-react";

export const adminSidebarItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    path: "/admin/profile",
    icon: UserCog,
  },
];

export const adminLogoutItem = {
  title: "Logout",
  icon: LogOut,
};