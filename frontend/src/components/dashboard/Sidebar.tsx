"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarItems, logoutItem } from "@/data/sidebar";
import { useAuthStore } from "@/store/authStore";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-green-700 text-white">
      <div className="border-b border-green-600 p-6 text-2xl font-bold">
        🌾 FarmLink AI
      </div>

      <nav className="flex-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === item.path
                  ? "bg-white text-green-700"
                  : "hover:bg-green-600"
              }`}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 hover:bg-red-600"
      >
        <logoutItem.icon size={20} />

        {logoutItem.title}
      </button>
    </aside>
  );
}