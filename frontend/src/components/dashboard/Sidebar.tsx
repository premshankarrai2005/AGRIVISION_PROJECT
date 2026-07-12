"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { farmerSidebarItems, farmerLogoutItem } from "@/data/farmerSidebar";

import { buyerSidebarItems, buyerLogoutItem } from "@/data/buyerSidebar";

import { adminSidebarItems, adminLogoutItem } from "@/data/adminSidebar";

import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Select sidebar according to logged-in user's role
  const sidebarItems =
    user?.role === "admin"
      ? adminSidebarItems
      : user?.role === "farmer"
        ? farmerSidebarItems
        : buyerSidebarItems;

  const logoutItem =
    user?.role === "admin"
      ? adminLogoutItem
      : user?.role === "farmer"
        ? farmerLogoutItem
        : buyerLogoutItem;

  return (
    <aside className="flex h-screen w-64 flex-col bg-green-700 text-white">
      {/* Logo */}
      <div className="border-b border-green-600 p-6 text-2xl font-bold">
        🌾 FarmLink AI
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive ? "bg-white text-green-700" : "hover:bg-green-600"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 hover:bg-red-600"
      >
        <logoutItem.icon size={20} />
        <span>{logoutItem.title}</span>
      </button>
    </aside>
  );
}
