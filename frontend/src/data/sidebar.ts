import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  LogOut,
  Heart,
} from "lucide-react";

export const sidebarItems = [
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
   {
    title: "Wishlist",
    path: "/wishlist",
    icon: Heart,
  },
];

export const logoutItem = {
  title: "Logout",
  icon: LogOut,
};