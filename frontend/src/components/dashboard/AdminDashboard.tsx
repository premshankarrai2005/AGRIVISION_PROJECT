"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          👑 Welcome
        </h1>

        <p className="text-gray-500">
          Admin Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Link
          href="/admin/users"
          className="rounded-xl bg-blue-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Users
          </h2>
        </Link>

        <Link
          href="/admin/products"
          className="rounded-xl bg-green-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Products
          </h2>
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-xl bg-yellow-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Orders
          </h2>
        </Link>

        <Link
          href="/admin/profile"
          className="rounded-xl bg-purple-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Profile
          </h2>
        </Link>

      </div>
    </div>
  );
}