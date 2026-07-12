import {
  Home,
  Package,
  Heart,
  ShoppingCart,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

export const buyerSidebarItems = [
  {
    title: "Home",
    path: "/buyer",
    icon: Home,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Wishlist",
    path: "/wishlist",
    icon: Heart,
  },
  {
    title: "Cart",
    path: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "My Orders",
    path: "/orders",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: "/buyer/profile",
    icon: User,
  },
];

export const buyerLogoutItem = {
  title: "Logout",
  icon: LogOut,
};