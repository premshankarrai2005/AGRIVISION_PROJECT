"use client";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-green-700">
          🌾 FarmLink AI
        </h1>
      </div>

      <div className="text-gray-700">
        Welcome, <span className="font-semibold">{user?.name || "Farmer"}</span>
      </div>
    </header>
  );
}